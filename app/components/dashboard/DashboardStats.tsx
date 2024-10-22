import prisma from "@/app/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, UserIcon } from "lucide-react";

async function getData() {
  const [user, products, order] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),

    prisma.product.findMany({
      select: {
        id: true,
      },
    }),

    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return {
    user,
    products,
    order,
  };
}

export async function DashboardStats() {
  const { products, user, order } = await getData();

  const totalAmount = order.reduce((accumalator, currentValue) => {
    return accumalator + currentValue.amount;
  }, 0);
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Revenue</CardTitle>
          <span className="w-fit h-fit rounded-full p-3 bg-green-500/10">
            <DollarSign className="size-7 text-green-500" />
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ${new Intl.NumberFormat("en-US").format(totalAmount / 100)}
          </p>
          <p className="text-xs text-muted-foreground">Based on 100 Charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Sales</CardTitle>
          <span className="w-fit h-fit rounded-full p-3 bg-blue-500/10">
            <ShoppingBag className="size-7 text-blue-500" />
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">+{order.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Sales on Awramart
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Products</CardTitle>
          <span className="w-fit h-fit rounded-full p-3 bg-red-500/10">
            <PartyPopper className="size-7 text-red-500" />
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{products.length}</p>
          <p className="text-xs text-muted-foreground">
            Total Products created
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Total Users</CardTitle>
          <span className="w-fit h-fit rounded-full p-3 bg-orange-500/10">
            <UserIcon className="size-7 text-orange-500" />
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{user.length}</p>
          <p className="text-xs text-muted-foreground">Total Users Signed Up</p>
        </CardContent>
      </Card>
    </div>
  );
}
