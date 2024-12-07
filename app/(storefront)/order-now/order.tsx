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
import Image from "next/image";
import { useState } from "react";

export const Order = ({
  productId,
  quantity,
}: {
  productId: string;

  quantity: number;
}) => {
  const countries = {
    AE: {
      name: "United Arab Emirates",
      cities: [
        "Dubai",
        "Abu Dhabi",
        "Sharjah",
        "Ajman",
        "Ras Al Khaimah",
        "Fujairah",
        "Umm Al Quwain",
      ],
    },
    SA: {
      name: "Saudi Arabia",
      cities: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar"],
    },
    QA: {
      name: "Qatar",
      cities: ["Doha", "Al Wakrah", "Al Khor", "Umm Salal", "Al Rayyan"],
    },
    KW: {
      name: "Kuwait",
      cities: ["Kuwait City", "Hawalli", "Salmiya", "Al Ahmadi", "Fahaheel"],
    },
    BH: {
      name: "Bahrain",
      cities: ["Manama", "Riffa", "Muharraq", "Hamad Town", "A'ali"],
    },
    OM: {
      name: "Oman",
      cities: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur"],
    },
    JP: {
      name: "Japan",
      cities: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya", "Sapporo"],
    },
    KR: {
      name: "South Korea",
      cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju"],
    },
    CN: {
      name: "China",
      cities: [
        "Beijing",
        "Shanghai",
        "Guangzhou",
        "Shenzhen",
        "Chengdu",
        "Hangzhou",
      ],
    },
    IN: {
      name: "India",
      cities: [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Hyderabad",
        "Chennai",
        "Kolkata",
      ],
    },
    SG: {
      name: "Singapore",
      cities: ["Singapore"],
    },
    MY: {
      name: "Malaysia",
      cities: [
        "Kuala Lumpur",
        "Penang",
        "Johor Bahru",
        "Kuching",
        "Kota Kinabalu",
      ],
    },
    TH: {
      name: "Thailand",
      cities: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Krabi"],
    },
    VN: {
      name: "Vietnam",
      cities: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Nha Trang", "Hoi An"],
    },
    ID: {
      name: "Indonesia",
      cities: ["Jakarta", "Bali", "Surabaya", "Bandung", "Yogyakarta"],
    },
    PH: {
      name: "Philippines",
      cities: ["Manila", "Cebu", "Davao", "Quezon City", "Makati"],
    },
    FR: {
      name: "France",
      cities: [
        "Paris",
        "Marseille",
        "Lyon",
        "Toulouse",
        "Nice",
        "Nantes",
        "Strasbourg",
        "Montpellier",
        "Bordeaux",
        "Lille",
      ],
    },
  };
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setCities(countries[country as keyof typeof countries]?.cities || []);
  };
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Awramart - Cash on Delivery
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Delivery Information
              </h2>
              <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                className="space-y-6"
              >
                <div className="flex flex-col gap-6">
                  <input type="hidden" name="productId" value={productId} />
                  <input type="hidden" name="quantity" value={quantity} />
                </div>
                <div className="flex flex-col gap-3 w-full ">
                  <Label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    key={fields.name.key}
                    name={fields.name.name}
                    defaultValue={fields.name.initialValue}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Name"
                    required
                  />

                  <p className="text-red-500">{fields.name.errors}</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-x-3 w-full mt-2">
                  <div className="flex flex-col gap-3 w-full">
                    <Label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      key={fields.email.key}
                      name={fields.email.name}
                      defaultValue={fields.email.initialValue}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Email "
                      required
                    />

                    <p className="text-red-500">{fields.email.errors}</p>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      key={fields.phone.key}
                      name={fields.phone.name}
                      defaultValue={fields.phone.initialValue}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Phone number"
                      required
                    />

                    <p className="text-red-500">{fields.phone.errors}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                  <div className="mt-1 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                      <Input
                        type="text"
                        key={fields.postalCode.key}
                        name={fields.postalCode.name}
                        defaultValue={fields.postalCode.initialValue}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Number"
                      />

                      <p className="text-red-500">{fields.postalCode.errors}</p>
                    </div>
                    <div className="sm:col-span-4">
                      <Input
                        type="text"
                        key={fields.streetAddress.key}
                        name={fields.streetAddress.name}
                        defaultValue={fields.streetAddress.initialValue}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Street"
                        required
                      />

                      <p className="text-red-500">
                        {fields.streetAddress.errors}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <Input
                    type="text"
                    key={fields.addressComplement.key}
                    name={fields.addressComplement.name}
                    defaultValue={fields.addressComplement.initialValue}
                    placeholder="Additional address information (optional)"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-x-3 w-full  mt-2 ">
                  <div className="flex flex-col gap-3 w-full">
                    <Label className="block text-sm font-medium text-gray-700">
                      Country
                    </Label>
                    <select
                      key={fields.Country.key}
                      name={fields.Country.name}
                      defaultValue={fields.Country.initialValue}
                      required
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a country</option>
                      {Object.entries(countries).map(([code, country]) => (
                        <option key={code} value={code}>
                          {country.name}
                        </option>
                      ))}
                    </select>

                    <p className="text-red-500">{fields.Country.errors}</p>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Label className="block text-sm font-medium text-gray-700">
                      City
                    </Label>
                    <select
                      id="city"
                      key={fields.City.key}
                      name={fields.City.name}
                      required
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="">Select a country first</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>

                    <p className="text-red-500">{fields.City.errors}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
                <div>
                  {/* <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Place Order
                  </button> */}
                </div>
                <SubmitButton text="Order Now" />
              </form>
            </div>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Cash on Delivery
              </h2>
              <div className="flex flex-col items-center">
                <Image
                  src="/delivery.jpeg"
                  alt="Cash on Delivery illustration showing a package and money"
                  width={400}
                  height={300}
                  className="mb-4 rounded-lg"
                />
                <p className="text-sm text-gray-500 text-center">
                  With our Cash on Delivery option, you can pay in cash when you
                  receive your order. It&apos;s simple, safe, and convenient!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
