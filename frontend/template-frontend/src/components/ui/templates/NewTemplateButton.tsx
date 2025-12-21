import * as Dialog from '@radix-ui/react-dialog'; import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import React from 'react';
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});
type formData = z.infer<typeof formSchema>;
interface NewTemplateButtonProps {
    createPost: (data: { name: string; description?: string }) => Promise<void>;
    isLoading: boolean;
}
export const NewTemplateButton = ({ createPost, isLoading }: NewTemplateButtonProps) => {
    const [open, setOpen] = React.useState(false);
    const { control, register, handleSubmit, formState: { errors } } = useForm<formData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
        }
    });
    const onSubmit = async (data: formData) => {
        try {
            await createPost({ name: data.name, description: data.description });
            setOpen(false);
        } catch (error) {
            console.error("Error creating template:", error);
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button type='button' className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 text-white shadow-sm transition-all active:scale-95">
                    Create New Template
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg outline-none">
                    <Dialog.Title className="text-lg font-medium text-slate-900">Create New Template</Dialog.Title>
                    <Dialog.Description className="mt-2 mb-4 text-sm text-slate-500">
                        Here you can create a new template that you can edit later.
                    </Dialog.Description>
                    {isLoading && <p>Creating template...</p>}
                    {!isLoading && (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">Template Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    {...register('description')}
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Dialog.Close asChild>
                                    <button type="button" className="rounded-md border px-3 py-2 text-sm">
                                        Cancel
                                    </button>
                                </Dialog.Close>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm text-white"
                                >
                                    Create Template
                                </button>
                            </div>
                        </form>
                    )}

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}



