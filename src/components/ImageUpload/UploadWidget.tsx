/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { ImagePlus } from "lucide-react";

declare global {
    interface Window {
        cloudinary: any;
    }
}

interface UploadWidgetProps {
    disabled?: boolean;
    onChange: (value: string) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ disabled, onChange }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    const [widget, setWidget] = useState(() =>
        window.cloudinary.createUploadWidget(
            {
                cloudName: import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME,
                uploadPreset: import.meta.env
                    .VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET,
            },
            (error: any, result: any) => {
                if (!error && result && result.event === "success") {
                    console.log("Done! Here is the image info: ", result.info);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    onChange(result.info.secure_url);
                }
            }
        )
    );

    const onClick = () => {
        widget.open();
    };

    return (
        <Button
            type="button"
            onClick={onClick}
            disabled={disabled}
            variant={"secondary"}
        >
            <ImagePlus className="h-4 w-4 mr-2" />
            Upload an Image
        </Button>
    );
};

export default UploadWidget;
