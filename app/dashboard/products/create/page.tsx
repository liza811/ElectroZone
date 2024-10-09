import { fetchCategories } from "@/lib/categories";
import ProductCreateRoute from "./create-product";

export type CatgoriesT = {
  id: string;
  name: string;
}[];

const ProductPage = async () => {
  const categories: CatgoriesT = await fetchCategories();
  return <ProductCreateRoute props={categories} />;
};

export default ProductPage;
