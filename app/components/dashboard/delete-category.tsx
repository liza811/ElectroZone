"use client";

import { deleteCategory } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { ClipLoader } from "react-spinners";
export function DeleteCatgory({ categoryId }: { categoryId: string }) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      deleteCategory(categoryId)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch((error) => {
          toast.error("Somthing went wrong");
        });
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          variant="outline"
          className="bg-transparent hover:bg-transparent border-none "
        >
          <Trash2Icon className="size-5 text-red-500 hover:text-red-400" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button
            className="cursor-pointer w-full md:w-[100px] bg-red-500 hover:bg-red-500/95"
            name="delete"
            title="delete"
            onClick={onClick}
            disabled={isPending}
          >
            {isPending ? <ClipLoader color="white" size={15} /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
