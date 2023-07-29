import { Trash } from "lucide-react";
import { Button } from "./ui/Button";
import Heading from "./ui/Heading";
import { Separator } from "./ui/Separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "../lib/types";
import React, { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/Form";
import { Input } from "./ui/Input";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import usePatch from "../hooks/usePatch";
import AlertModal from "./modals/AlertModal";
import useDelete from "../hooks/useDelete";
import ApiAlert from "./Api/ApiAlert";

interface SettingsFormProps {
    initialData: Store;
}

const settingsFormSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormPayload = z.infer<typeof settingsFormSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
    const params = useParams();
    const customPatch = usePatch();
    const customDelete = useDelete();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const settingsForm = useForm<SettingsFormPayload>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: SettingsFormPayload) => {
        try {
            setIsLoading(true);
            await customPatch(`/store/${params.storeId!}`, data);
            navigate(0);
            toast.success("Store updated");
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
            await customDelete(`/store/${params.storeId!}`);
            navigate("/");
            toast.success("Store deleted");
        } catch (error) {
            console.log(error);
            toast.error(
                "Something went wrong. Make sure you removed all products and categories first."
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
                <Heading
                    title="Settings"
                    description="Manage store preferences"
                />
                <Button
                    disabled={isLoading}
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...settingsForm}>
                <form
                    onSubmit={settingsForm.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={settingsForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Store name"
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
                        Save changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert
                title="PUBLIC_API_URL"
                description={`${
                    import.meta.env.VITE_REACT_APP_BACKEND_URL as string
                }/store/${params.storeId!}`}
                variant="public"
            />
        </>
    );
};

export default SettingsForm;
