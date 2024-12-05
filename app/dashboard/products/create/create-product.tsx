"use client";

import { createProduct } from "@/app/actions";
import { UploadDropzone } from "@/app/lib/uplaodthing";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, PlusCircleIcon, X, XIcon } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { productSchema } from "@/app/lib/zodSchemas";
import { useState } from "react";

import Image from "next/image";

import { SubmitButton } from "@/app/components/SubmitButtons";
import { CatgoriesT } from "./page";

export default function ProductCreateRoute({ props }: { props: CatgoriesT }) {
  const [images, setImages] = useState<string[]>([]);
  const [lastResult, action] = useFormState(createProduct, undefined);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor("");
    }
  };

  const addSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize]);
      setNewSize("");
    }
  };

  const removeColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  const removeSize = (size: string) => {
    setSizes(sizes.filter((s) => s !== size));
  };
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4 md:p-6 ">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
      </div>

      <Card className="mt-5 md:my-6 w-[80%] mx-auto">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            In this form you can create your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                className="w-full"
                placeholder="Product Name"
              />

              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
                placeholder="Write your description right here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex justify-around items-center w-full gap-x-3">
              <div className="flex flex-col gap-3 w-[45%]">
                <Label>Price</Label>
                <Input
                  key={fields.price.key}
                  name={fields.price.name}
                  defaultValue={fields.price.initialValue}
                  step="any"
                  placeholder="55AED"
                />
                <p className="text-red-500">{fields.price.errors}</p>
              </div>
              <div className="flex flex-col gap-3 w-[45%]">
                <Label>Quantity</Label>
                <Input
                  key={fields.quantity.key}
                  name={fields.quantity.name}
                  defaultValue={fields.quantity.initialValue}
                  type="number"
                  placeholder="50"
                />
                <p className="text-red-500">{fields.quantity.errors}</p>
              </div>
            </div>
            <div className="flex justify-around items-center w-full gap-x-3">
              <div className="flex flex-col gap-3 w-[45%]">
                <Label>Featured Product</Label>
                <Switch
                  key={fields.isFeatured.key}
                  name={fields.isFeatured.name}
                  defaultValue={fields.isFeatured.initialValue}
                />
                <p className="text-red-500">{fields.isFeatured.errors}</p>
              </div>
              <div className="flex flex-col gap-3 w-[45%]">
                <Label>Is your product in promotion? Set the new price</Label>
                <Input
                  key={fields.newPrice.key}
                  name={fields.newPrice.name}
                  defaultValue={fields.newPrice.initialValue}
                  step="any"
                  placeholder="20 AED"
                />
                <p className="text-red-500">{fields.newPrice.errors}</p>
              </div>
            </div>
            <div className="flex justify-around items-center w-full gap-x-3">
              <div className="flex flex-col gap-3 w-[45%]">
                <Label>Status</Label>
                <Select
                  key={fields.status.key}
                  name={fields.status.name}
                  defaultValue={fields.status.initialValue}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.status.errors}</p>
              </div>

              <div className="flex flex-col gap-3 w-[45%]">
                <Label>Category</Label>
                <Select
                  key={fields.category.key}
                  name={fields.category.name}
                  defaultValue={fields.category.initialValue}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {props.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-red-500">{fields.category.errors}</p>
              </div>
            </div>
            <div className="flex w-full justify-between gap-x-4 items-center">
              <div className="w-full md:w-[80%] ">
                <h2>Colors</h2>
                <div className="flex gap-x-1">
                  <Input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Enter a color"
                    className="w-[200px]"
                  />
                  <Button
                    type="button"
                    onClick={addColor}
                    className="flex gap-x-1 px-5 focus:outline-none focus-visible:ring-0 ring-0"
                  >
                    <PlusCircleIcon size={18} />
                    Add
                  </Button>
                </div>
                <ul className="flex gap-1 flex-wrap max-w-[80%]">
                  {colors.map((color) => (
                    <li key={color} className="mt-6">
                      <span
                        className=" p-3.5 px-7 rounded-full mt-4 relative"
                        style={{ backgroundColor: `#${color}` }}
                      >
                        {" "}
                        <button
                          type="button"
                          onClick={() => removeColor(color)}
                          title="remove"
                          name="remove"
                          className="absolute -top-1 -right-1 bg-red-500 p-1 rounded-full text-white"
                        >
                          <XIcon size={14} />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full  md:w-[80%]">
                <h2>Sizes</h2>
                <div className="flex gap-x-1">
                  <Input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Enter a size"
                    className="w-[200px]"
                  />
                  <Button
                    type="button"
                    onClick={addSize}
                    className="flex gap-x-1 px-5 focus:outline-none focus-visible:ring-0 ring-0"
                  >
                    <PlusCircleIcon size={18} />
                    Add
                  </Button>
                </div>
                <ul className="flex gap-3 flex-wrap max-w-[80%]">
                  {sizes.map((size) => (
                    <li key={size} className="mt-6">
                      <span className="rounded-md border px-4 py-0.5 mt-4 relative text-[19px]">
                        {size}
                        <button
                          type="button"
                          onClick={() => removeSize(size)}
                          title="remove"
                          name="remove"
                          className="absolute -top-2 -right-2 bg-red-500 p-0.5 rounded-full text-white"
                        >
                          <XIcon size={14} />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 ">
              <Label>Images</Label>
              <input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as any}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />

                      <button
                        name="create"
                        title="create"
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}

              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  );
}
