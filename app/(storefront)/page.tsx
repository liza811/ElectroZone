import { CategoriesSelection } from "../components/storefront/CategorySelection";
import { FeaturedProducts } from "../components/storefront/FeaturedProducts";
import { Hero } from "../components/storefront/Hero";
import { OtherProducts } from "../components/storefront/other-products";

export default function IndexPage() {
  return (
    <div className="h-full  pb-4">
      <Hero />

      <CategoriesSelection />
      <FeaturedProducts />
      <OtherProducts />
    </div>
  );
}
