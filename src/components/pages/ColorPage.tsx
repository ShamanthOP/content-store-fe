import { useParams } from "react-router-dom";
import useColors from "../../hooks/useColors";
import ColorForm from "../Colors/ColorForm";

const ColorPage = () => {
    const { data: colors, isLoading } = useColors();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm
                    initialData={colors?.find(
                        (color) => color.id === params.colorId
                    )}
                />
            </div>
        </div>
    );
};

export default ColorPage;
