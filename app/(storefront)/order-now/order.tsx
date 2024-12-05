"use client";
import { deliveryOrder } from "@/app/actions";

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

import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { deliverySchema } from "@/app/lib/zodSchemas";

import { SubmitButton } from "@/app/components/SubmitButtons";

export const Order = ({
  productId,
  quantity,
}: {
  productId: string;

  quantity: number;
}) => {
  const [lastResult, action] = useFormState(deliveryOrder, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: deliverySchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      className="bg-[#fbfbfb]"
    >
      <div className="flex items-center gap-4 md:p-6 pt-4">
        <h1 className="text-xl font-semibold tracking-tight">
          Make your Order
        </h1>
      </div>

      <Card className="mt-5 md:my-6 w-[95%] mx-auto bg-white">
        <CardHeader>
          <CardTitle>DELIVERY INFORMATIONS</CardTitle>
          <CardDescription>
            In this form you can create your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="quantity" value={quantity} />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              key={fields.name.key}
              name={fields.name.name}
              className="w-full"
              placeholder="Name"
            />

            <p className="text-red-500">{fields.name.errors}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Email Address</Label>
            <Input
              type="email"
              key={fields.email.key}
              name={fields.email.name}
              className="w-full"
              placeholder="Email "
            />

            <p className="text-red-500">{fields.email.errors}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Phone Number</Label>
            <Input
              type="number"
              key={fields.phone.key}
              name={fields.phone.name}
              className="w-full"
              placeholder="Phone number"
            />

            <p className="text-red-500">{fields.phone.errors}</p>
            <div className="flex flex-col gap-3">
              <Label>Country</Label>
              <Input
                type="text"
                key={fields.Country.key}
                name={fields.Country.name}
                className="w-full"
                placeholder="Country"
              />

              <p className="text-red-500">{fields.Country.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>City</Label>
              <Input
                type="text"
                key={fields.City.key}
                name={fields.City.name}
                className="w-full"
                placeholder="Country"
              />

              <p className="text-red-500">{fields.City.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Order" />
        </CardFooter>
      </Card>
    </form>
  );
};
