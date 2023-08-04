import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useCategories from "../../hooks/useCategories";
import useSizes from "../../hooks/useSizes";
import useColors from "../../hooks/useColors";
import ProductForm from "../Products/ProductForm";

const ProductPage = () => {
    const { data: categories, isLoading: isCategoriesLoading } =
        useCategories();
    const { data: sizes, isLoading: isSizesLoading } = useSizes();
    const { data: colors, isLoading: isColorsLoading } = useColors();
    const { data: products, isLoading: isProductsLoading } = useProducts();
    const params = useParams();

    if (
        isCategoriesLoading ||
        isSizesLoading ||
        isColorsLoading ||
        isProductsLoading
    ) {
        return null;
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    initialData={products?.find(
                        (product) => product.id === params.productId
                    )}
                    categories={categories ?? []}
                    sizes={sizes ?? []}
                    colors={colors ?? []}
                />
            </div>
        </div>
    );
};

export default ProductPage;
