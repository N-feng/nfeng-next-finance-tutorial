import { useRef, useState } from "react";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/select";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const accountsQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const accountOtions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));
  const onCreateAccount = (name: string) => accountMutation.mutate({ name });

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);
  const selectValue = useRef<string>();

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });
  const handleClose = () => {
    setPromise(null);
  };
  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };
  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const AccountDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select an account to continue
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOtions}
          onCreate={onCreateAccount}
          onChange={(value) => (selectValue.current = value)}
          disabled={accountMutation.isPending || accountsQuery.isLoading}
        />
        <DialogFooter className="pt-2 flex flex-col lg:flex-row gap-x-2 gap-y-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [AccountDialog, confirm];
};
