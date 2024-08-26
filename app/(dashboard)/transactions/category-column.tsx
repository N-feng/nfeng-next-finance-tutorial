import { TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";

type Props = {
  id: string;
  categoryId: string | null;
  category: string | null;
};

export const CategoryColumn = ({ id, categoryId, category }: Props) => {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) onOpenCategory(categoryId);
    else onOpenTransaction(id);
  };

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-red-500"
      )}
      onClick={onClick}
    >
      {!categoryId && <TriangleAlert className="size-4 mr-2 shrink-0" />}
      {category || "Uncategoriezed"}
    </div>
  );
};
