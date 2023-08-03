import { format } from "date-fns";
import useColors from "../../hooks/useColors";
import Colors from "../Colors/Colors";
import { ColorColumn } from "../Colors/ColorColumns";

const ColorsPage = () => {
    const { data: colors, isLoading } = useColors();

    if (isLoading || !colors) {
        return null;
    }

    const formattedColors: ColorColumn[] = colors.map((color) => ({
        id: color.id,
        name: color.name,
        value: color.value,
        createdAt: format(new Date(color.createdAt), "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Colors data={formattedColors} />
            </div>
        </div>
    );
};

export default ColorsPage;
