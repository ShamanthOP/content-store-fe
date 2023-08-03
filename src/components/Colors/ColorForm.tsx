import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import useDelete from "../../hooks/useDelete";
import usePatch from "../../hooks/usePatch";
import usePost from "../../hooks/usePost";
import { Color } from "../../lib/types";
import AlertModal from "../modals/AlertModal";
import { Button } from "../ui/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/Form";
import Heading from "../ui/Heading";
import { Input } from "../ui/Input";
import { Separator } from "../ui/Separator";

interface ColorFormProps {
    initialData: Color | undefined;
}

const colorFormSchema = z.object({
    name: z.string().min(1),
    value: z
        .string()
        .min(4)
        .regex(/^#/, { message: "String must be a valid hex code." }),
});

type ColorFormPayload = z.infer<typeof colorFormSchema>;

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const params = useParams();
    const customPost = usePost();
    const customPatch = usePatch();
    const customDelete = useDelete();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const title = initialData ? "Edit Color" : "Create Color";
    const description = initialData ? "Edit the color" : "Add a new color";
    const toastMessage = initialData ? "Color updated" : "Color created";
    const action = initialData ? "Save changes" : "Create";

    const colorForm = useForm<ColorFormPayload>({
        resolver: zodResolver(colorFormSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        },
    });

    const onSubmit = async (data: ColorFormPayload) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await customPatch(
                    `/${params.storeId!}/colors/${params.colorId!}`,
                    data
                );
            } else {
                await customPost(`/${params.storeId!}/colors`, data);
            }
            toast.success(toastMessage);
            navigate(`/${params.storeId!}/colors`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await customDelete(`/${params.storeId!}/colors/${params.colorId!}`);
            navigate(`/${params.storeId!}/colors`);
            toast.success("Color deleted");
        } catch (error) {
            console.log(error);
            toast.error(
                "Something went wrong. Make sure you removed all products using this color."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                isLoading={isLoading}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        disabled={isLoading}
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...colorForm}>
                <form
                    onSubmit={colorForm.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={colorForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Color name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={colorForm.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Color value"
                                                {...field}
                                            />
                                            <div
                                                className="border p-4 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        field.value,
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={isLoading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default ColorForm;
