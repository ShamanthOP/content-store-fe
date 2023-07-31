import { format } from "date-fns";
import useSizes from "../../hooks/useSizes";
import { SizeColumn } from "../Sizes/SizeColumns";
import Sizes from "../Sizes/Sizes";

const SizesPage = () => {
    const { data: sizes, isLoading } = useSizes();

    if (isLoading || !sizes) {
        return null;
    }

    const formattedSizes: SizeColumn[] = sizes.map((size) => ({
        id: size.id,
        name: size.name,
        value: size.value,
        createdAt: format(new Date(size.createdAt), "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Sizes data={formattedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
