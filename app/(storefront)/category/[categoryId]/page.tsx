import { ProductCard } from "@/app/components/storefront/ProductCard";
import { getProductsByCategory } from "@/lib/categories";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

const CatgoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const products = await getProductsByCategory(params.categoryId, user?.id);

  const dataProducts = products?.products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images,
    NewPrice: product.NewPrice,
    quantity: product.quantity,
    Like: product.Like,
  }));

  return (
    <main className="w-full h-full mt-6 flex flex-col gap-y-5">
      <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-gray-100 w-full h-[35vh]  md:min-h-[50vh]">
        {/* Category Image */}
        <Image
          src={products?.imageString || ""}
          alt={products?.name || "category image"}
          fill
          className="object-cover"
        />

        {/* Category Name */}
        <h1 className="absolute top-2 left-2 bg-white bg-opacity-80 px-3 py-1 text-black text-xl font-semibold rounded-sm">
          {products?.name || "Category"}
        </h1>
      </div>
      <section className="py-8 w-full h-full">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl capitalize">
          {products?.name} Products
        </h1>

        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {!dataProducts || !dataProducts.length ? (
            <h1 className=" w-full mx-auto text-center capitalize text-lg font-bold py-9">
              {" "}
              No products found
            </h1>
          ) : (
            <>
              {dataProducts?.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  isGuest={user ? false : true}
                />
              ))}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default CatgoryPage;
