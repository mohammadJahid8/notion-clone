"use client";

import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import Title from "./Title";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined)
    return (
      <nav className="bg-background px-3  py-2 w-full flex items-center">
        <Title.Skeleton />
      </nav>
    );

  if (document === null) return null;

  return (
    <nav className="bg-background px-3  py-2 w-full flex items-center gap-x-4">
      {isCollapsed && (
        <MenuIcon
          role="butotn"
          onClick={onResetWidth}
          className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition cursor-pointer"
        />
      )}
      <div className="flex items-center justify-between w-full">
        <Title initialData={document} />
      </div>
    </nav>
  );
};

export default Navbar;
