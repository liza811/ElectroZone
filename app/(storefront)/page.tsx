import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Hero } from "../components/storefront/Hero";
import { OtherProducts } from "../components/storefront/other-products";

export default async function IndexPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="h-full  pb-4">
      <Hero />

      <CategoriesSelection />
      <FeaturedProducts userId={user?.id} />
      <OtherProducts userId={user?.id} />
    </div>
  );
}
