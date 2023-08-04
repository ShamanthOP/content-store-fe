import { format } from "date-fns";
import useProducts from "../../hooks/useProducts";
import { priceFormatter } from "../../lib/utils";
import { ProductColumn } from "../Products/ProductColumns";
import Products from "../Products/Products";

const ProductsPage = () => {
    const { data: products, isLoading } = useProducts();

    if (isLoading || !products) {
        return null;
    }

    const formattedProducts: ProductColumn[] = products.map((product) => ({
        id: product.id,
        name: product.name,
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        price: priceFormatter.format(product.price),
        category: product.category.name,
        size: product.size.name,
        color: product.color.value,
        createdAt: format(new Date(product.createdAt), "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Products data={formattedProducts} />
            </div>
        </div>
    );
};

export default ProductsPage;
