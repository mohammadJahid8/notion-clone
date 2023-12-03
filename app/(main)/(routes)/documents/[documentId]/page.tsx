"use client";

import Toolbar from "@/app/(main)/_components/Toolbar";
import Cover from "@/components/cover";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentDetailsProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentDetailsPage = ({ params }: DocumentDetailsProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <p>Loading...</p>;
  }

  if (document === null) return <div>Not found</div>;

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentDetailsPage;
