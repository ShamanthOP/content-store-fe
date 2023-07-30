import useCategories from "../../hooks/useCategories";
import { format } from "date-fns";
import { CategoryColumn } from "../Categories/CategoryColumns";
import Categories from "../Categories/Categories";

const CategoriesPage = () => {
    const { data: categories, isLoading } = useCategories();

    if (isLoading || !categories) {
        return null;
    }

    console.log(categories);

    const formattedCategories: CategoryColumn[] = categories.map(
        (category) => ({
            id: category.id,
            name: category.name,
            billboardLabel: category.billboard.label,
            createdAt: format(new Date(category.createdAt), "MMMM do, yyyy"),
        })
    );

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Categories data={formattedCategories} />
            </div>
        </div>
    );
};

export default CategoriesPage;
