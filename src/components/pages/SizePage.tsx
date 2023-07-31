import { useParams } from "react-router-dom";
import useSizes from "../../hooks/useSizes";
import SizeForm from "../Sizes/SizeForm";

const SizePage = () => {
    const { data: sizes, isLoading } = useSizes();
    const params = useParams();

    if (isLoading) {
        return null;
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm
                    initialData={sizes?.find(
                        (size) => size.id === params.sizeId
                    )}
                />
            </div>
        </div>
    );
};

export default SizePage;
