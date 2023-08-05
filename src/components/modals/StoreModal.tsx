import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import usePost from "../../hooks/usePost";
import { useStoreModal } from "../../hooks/useStoreModal";
import { Store } from "../../lib/types";
import { Button } from "../ui/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import Modal from "../ui/Modal";

const formValidator = z.object({
    name: z.string().min(1),
});

type FormPayload = z.infer<typeof formValidator>;

const StoreModal = () => {
    const storeModal = useStoreModal();
    const customPost = usePost();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormPayload>({
        resolver: zodResolver(formValidator),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: FormPayload) => {
        setIsLoading(true);
        try {
            const newStore = (await customPost("/", values)) as Store;
            window.location.assign(`/${newStore.id}`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="E-Commerce"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    variant={"outline"}
                                    onClick={storeModal.onClose}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
};

export default StoreModal;
