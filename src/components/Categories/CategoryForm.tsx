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
import { Billboard, Category } from "../../lib/types";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/Select";

interface CategoryFormProps {
    initialData: Category | undefined;
    billboards: Billboard[];
}

const categoryFormSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1),
});

type CategoryFormPayload = z.infer<typeof categoryFormSchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
    billboards,
}) => {
    const params = useParams();
    const customPost = usePost();
    const customPatch = usePatch();
    const customDelete = useDelete();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const title = initialData ? "Edit Category" : "Create Category";
    const description = initialData
        ? "Edit the category"
        : "Add a new category";
    const toastMessage = initialData ? "Category updated" : "Category created";
    const action = initialData ? "Save changes" : "Create";

    const categoryForm = useForm<CategoryFormPayload>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: "",
        },
    });

    const onSubmit = async (data: CategoryFormPayload) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await customPatch(
                    `/${params.storeId!}/categories/${params.categoryId!}`,
                    data
                );
            } else {
                await customPost(`/${params.storeId!}/categories`, data);
            }
            toast.success(toastMessage);
            navigate(`/${params.storeId!}/categories`);
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
                `/${params.storeId!}/categories/${params.categoryId!}`
            );
            navigate(`/${params.storeId!}/categories`);
            toast.success("Category deleted");
        } catch (error) {
            console.log(error);
            toast.error(
                "Something went wrong. Make sure you removed all products using this category."
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
            <Form {...categoryForm}>
                <form
                    onSubmit={categoryForm.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={categoryForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Category name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={categoryForm.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a billboard"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}
                                                >
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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

export default CategoryForm;
