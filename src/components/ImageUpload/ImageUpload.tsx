import React from "react";
import { Button } from "../ui/Button";
import { Trash } from "lucide-react";
import UploadWidget from "./UploadWidget";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    onRemove,
    value,
    disabled,
}) => {
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative w-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant={"destructive"}
                                size={"icon"}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <img className="object-cover" alt="Image" src={url} />
                    </div>
                ))}
            </div>
            <UploadWidget onChange={onChange} disabled={disabled} />
        </div>
    );
};

export default ImageUpload;
