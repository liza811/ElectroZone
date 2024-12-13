import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardStats } from "../components/dashboard/DashboardStats";
import { RecentSales } from "../components/dashboard/RecentSales";
import { Chart } from "../components/dashboard/Chart";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

async function getData() {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
      cashOnDelivery: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.cashOnDelivery ? item.amount : item.amount / 100,
  }));

  return result;
}

export default async function Dashboard() {
  noStore();
  const data = await getData();
  return (
    <main className="mb-10 mt-5">
      <Button variant="outline" asChild className="mb-3 bg-black text-white">
        <Link href="/" className="flex gap-x-2">
          <ChevronLeft className="w-4 h-4" /> Home
        </Link>
      </Button>
      <DashboardStats />

      <div className="grid gap-4 md:gp-8 lg:grid-cols-2 xl:grid-cols-3 mt-10">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>

        <RecentSales />
      </div>
    </main>
  );
}
