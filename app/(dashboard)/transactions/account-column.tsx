import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

type Props = {
  accountId: string;
  account: string;
};

export const AccountColumn = ({ accountId, account }: Props) => {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    onOpenAccount(accountId);
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </div>
  );
};
