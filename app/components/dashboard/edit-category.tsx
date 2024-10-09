"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChevronLeft, XIcon } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "../SubmitButtons";

import Image from "next/image";
import { UploadDropzone } from "@/app/lib/uplaodthing";

import { useState } from "react";
import { useFormState } from "react-dom";
import { editCategory } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { bannerSchema } from "@/app/lib/zodSchemas";

interface iAppProps {
  id: string;
  name: string;

  imageString: string;
}
interface editFormProps {
  data: iAppProps;
}

export function EditCategory({ data }: editFormProps) {
  const [image, setImage] = useState<string | undefined>(data.imageString);
  const [lastResult, action] = useFormState(editCategory, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = () => {
    setImage("");
  };
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type="hidden" name="categoryId" value={data.id} />
      <div className="flex items-center gap-4 md:p-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/categories">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Category</h1>
      </div>

      <Card className="mt-5 md:m-6">
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            In this form you can update your Category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={data.name}
                className="w-full"
                placeholder="Product Name"
              />

              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Image</Label>
              <input
                type="hidden"
                value={image}
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={fields.imageString.initialValue}
              />
              {image !== undefined && image !== "" ? (
                <div className="relative w-[200px] h-[200px]">
                  <Image
                    src={image}
                    alt="Product Image"
                    width={200}
                    height={200}
                    className="w-[200px] h-[200px] object-cover border rounded-lg"
                  />
                  <button
                    title="update"
                    onClick={() => handleDelete()}
                    type="button"
                    className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                  endpoint="bannerImageRoute"
                />
              )}

              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Edit Banner" />
        </CardFooter>
      </Card>
    </form>
  );
}
