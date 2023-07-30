import { useParams } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import CategoryForm from "../Categories/CategoryForm";
import useBillboards from "../../hooks/useBillboards";

const CategoryPage = () => {
    const { data: billboards } = useBillboards();
    const { data: categories, isLoading } = useCategories();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryForm
                    initialData={categories?.find(
                        (category) => category.id === params.categoryId
                    )}
                    billboards={billboards ?? []}
                />
            </div>
        </div>
    );
};

export default CategoryPage;
