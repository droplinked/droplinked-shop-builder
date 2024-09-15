// productUtils.ts

interface Product {
  title?: string;
  description?: string;
  media?: Array<{ isMain: boolean; thumbnail: string }>;
  skuIDs?: Array<{ price: number }>;  // قیمت به عنوان عدد دریافت می‌شود
  productTile?: string[];
  _id?: string;
  slug?: string;
}

export interface TransformedProduct {
  title: string;
  description: string;
  image: string;
  price: string;  // قیمت به عنوان رشته برگردانده می‌شود
  productTile: string;
  id: string;
  slug: string;
}

export function transformProductData(product: Product | undefined): TransformedProduct | null {
  if (!product) {
    return null;
  }

  // حذف تگ‌های HTML و محدود کردن طول توضیحات به 15 کاراکتر
  const formatDescription = (description: string | undefined): string => {
    if (!description) return "No description available.";
    
    // حذف تگ‌های HTML
    const strippedDescription = description.replace(/<\/?[^>]+(>|$)/g, "");
    
    // محدود کردن طول به 15 کاراکتر و اضافه کردن "..."
    return strippedDescription.length > 15 
      ? strippedDescription.substring(0, 15) + "..." 
      : strippedDescription;
  };

  // محدود کردن طول عنوان به 25 کاراکتر
  const formatTitle = (title: string | undefined): string => {
    if (!title) return "Title";
    
    // محدود کردن طول به 25 کاراکتر و اضافه کردن "..."
    return title.length > 25 ? title.substring(0, 25) + "..." : title;
  };

  const transformedData: TransformedProduct = {
    title: formatTitle(product.title),
    description: formatDescription(product.description),
    image: product.media?.find((item) => item.isMain)?.thumbnail || "https://via.placeholder.com/150",
    price: product.skuIDs && product.skuIDs.length > 0 
      ? product.skuIDs[0].price.toFixed(2)  // تبدیل به فرمت دو رقم اعشار و سپس رشته
      : "0.00",
    productTile: product.productTile && product.productTile.length > 0 ? product.productTile[0] : "",
    id: product._id || "",
    slug: product.slug || "",
  };

  console.log(transformedData); // لاگ کردن داده‌های تبدیل شده
  return transformedData;
}
