import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      cashOnDelivery: true,
      orderNumber: true,
      guestEmail: true,
      guestName: true,
      guestPhone: true,
      billingAddressLine1: true,
      billingAddressLine2: true,
      billingCity: true,
      billingCountry: true,
      billingPostalCode: true,
      orderItems: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              NewPrice: true,
            },
          },
        },
      },
      User: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function OrdersPage() {
  noStore();
  const data = await getData();
  return (
    <main className="my-10">
      <Card>
        <CardHeader className="  px-4">
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent orders from your store!</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Order Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <p className="font-medium">
                      {item.guestName ||
                        `${item.User?.firstName} ${item.User?.lastName}`}
                    </p>
                    <p className="hidden md:flex text-sm text-muted-foreground max-w-36 text-wrap">
                      {`${item.guestPhone ? item.guestPhone : ""}  ${
                        item.guestEmail
                      }` || item.User?.email}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {item.orderItems.map((o) => (
                        <div
                          key={o.product.id}
                          className="border-b py-2  last:border-b-0"
                        >
                          <p className="font-semibold text-sm">
                            {o.product.name}
                          </p>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Quantity: {o.quantity}</span>
                            <span>
                              Price: {o.product.NewPrice || o.product.price} AED
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <span
                      className={`inline-block  text-xs font-semibold capitalize  px-3 py-1.5 text-center rounded-md
            ${
              item.status === "complete"
                ? "bg-[#33D69F1A] text-[#33D69F]"
                : item.status === "pending"
                ? "bg-[#ff8F001A] text-[#ff8F00]"
                : "bg-[#FF00001A] text-[#FF0000]"
            }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(item.createdAt))}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      <p>{item.billingAddressLine1}</p>
                      {item.billingAddressLine2 && (
                        <p>{item.billingAddressLine2}</p>
                      )}
                      <p>
                        {item.billingCity} {item.billingPostalCode}{" "}
                        {item.billingCountry}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-800">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "AED",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      item.cashOnDelivery ? item.amount : item.amount / 100
                    )}
                  </TableCell>
                  <TableCell>{item.orderNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
