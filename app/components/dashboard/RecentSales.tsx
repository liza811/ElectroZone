import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      guestName: true,
      guestEmail: true,
      cashOnDelivery: true,
      User: {
        select: {
          firstName: true,

          profileImage: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });

  return data;
}

export async function RecentSales() {
  const data = await getData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden sm:flex h-9 w-9">
              {item.User?.profileImage ? (
                <AvatarImage src={item.User?.profileImage} alt="Avatar Image" />
              ) : (
                <AvatarFallback>
                  {item.User?.firstName.slice(0, 3)}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium capitalize">
                {item.User?.firstName || item.guestName?.toLowerCase()}
              </p>
              <p className="text-sm text-muted-foreground">
                {item.User?.email || item.guestEmail}
              </p>
            </div>
            <p className="ml-auto font-medium">
              {new Intl.NumberFormat("en-US").format(
                item.cashOnDelivery ? item.amount : item.amount / 100
              )}{" "}
              AED
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
