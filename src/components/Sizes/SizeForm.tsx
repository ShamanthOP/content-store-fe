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
import { Size } from "../../lib/types";
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

interface SizeFormProps {
    initialData: Size | undefined;
}

const sizeFormSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});

type SizeFormPayload = z.infer<typeof sizeFormSchema>;

const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
    const params = useParams();
    const customPost = usePost();
    const customPatch = usePatch();
    const customDelete = useDelete();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const title = initialData ? "Edit Size" : "Create Size";
    const description = initialData ? "Edit the size" : "Add a new size";
    const toastMessage = initialData ? "Size updated" : "Size created";
    const action = initialData ? "Save changes" : "Create";

    const sizeForm = useForm<SizeFormPayload>({
        resolver: zodResolver(sizeFormSchema),
        defaultValues: initialData || {
            name: "",
            value: "",
        },
    });

    const onSubmit = async (data: SizeFormPayload) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await customPatch(
                    `/${params.storeId!}/sizes/${params.sizeId!}`,
                    data
                );
            } else {
                await customPost(`/${params.storeId!}/sizes`, data);
            }
            toast.success(toastMessage);
            navigate(`/${params.storeId!}/sizes`);
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
            await customDelete(`/${params.storeId!}/sizes/${params.sizeId!}`);
            navigate(`/${params.storeId!}/sizes`);
            toast.success("Size deleted");
        } catch (error) {
            console.log(error);
            toast.error(
                "Something went wrong. Make sure you removed all products using this size."
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
            <Form {...sizeForm}>
                <form
                    onSubmit={sizeForm.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={sizeForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Size name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={sizeForm.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Size value"
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
        </>
    );
};

export default SizeForm;
