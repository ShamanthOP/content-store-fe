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
import { Billboard } from "../../lib/types";
import ImageUpload from "../ImageUpload/ImageUpload";
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

interface BillBoardFormProps {
    initialData: Billboard | undefined;
}

const billboardFormSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1),
});

type BillboardFormPayload = z.infer<typeof billboardFormSchema>;

const BillboardForm: React.FC<BillBoardFormProps> = ({ initialData }) => {
    const params = useParams();
    const customPost = usePost();
    const customPatch = usePatch();
    const customDelete = useDelete();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const title = initialData ? "Edit Billboard" : "Create Billboard";
    const description = initialData
        ? "Edit the billboard"
        : "Create a new billboard";
    const toastMessage = initialData
        ? "Billboard updated"
        : "Billboard created";
    const action = initialData ? "Save changes" : "Create";

    const settingsForm = useForm<BillboardFormPayload>({
        resolver: zodResolver(billboardFormSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: "",
        },
    });

    const onSubmit = async (data: BillboardFormPayload) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await customPatch(
                    `/${params.storeId!}/billboards/${params.billboardId!}`,
                    data
                );
            } else {
                await customPost(`/${params.storeId!}/billboards`, data);
            }
            toast.success(toastMessage);
            navigate(`/${params.storeId!}/billboards`);
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
            await customDelete(
                `/${params.storeId!}/billboards/${params.billboardId!}`
            );
            ("/");
            toast.success("Billboard deleted");
        } catch (error) {
            console.log(error);
            toast.error(
                "Something went wrong. Make sure you removed all categories using this billboard."
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
            <Form {...settingsForm}>
                <form
                    onSubmit={settingsForm.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={settingsForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={settingsForm.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Billboard label"
                                            {...field}
                                        />
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
            <Separator />
        </>
    );
};

export default BillboardForm;
