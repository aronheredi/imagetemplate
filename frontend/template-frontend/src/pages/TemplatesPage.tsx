import api from "@/api/axios"
import { NewTemplateButton } from "@/components/ui/templates/NewTemplateButton"
import { TemplatesCard } from "@/components/ui/templates/TemplatesCard"
import type { Template } from "@/types/templates"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

const deletePost = async (id: string) => {
    const response = await api.delete(`/templates/${id}`)
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Network response was not ok')
    }
    return response.data;
}
const createPost = async (data: { name: string; description?: string }) => {

    const response = await api.post('/templates', data);
    if (response.status < 200 || response.status >= 300) {
        throw new Error('Network response was not ok')
    }
    return response.data;
}
export const TemplatesPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['templates'],
        queryFn: async () => {
            const response = await api('/templates')
            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok')
            }
            console.log('Fetched templates:', response.data)
            return response.data;
        }
    })
    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['templates'] });
        }
    });
    const createMutation = useMutation({
        mutationFn: async (data: { name: string; description?: string }) => await createPost(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['templates'] });
        }
    });
    if (isLoading) return <div>Loading your templates...</div>
    if (isError) return <div>There was an error loading your templates.Try refreshing.</div>
    return (
        <div className="mx-auto max-w-screen-xl" >
            <div className="flex flex-row items-center justify-between py-6">
                <div className="flex flex-col ">
                    <h1 className="text-2xl text-slate-900 font-bold mb-4">Templates Page</h1>
                    <p className="text-slate-500">Manage and create your image generation templates.</p>
                </div>
                <NewTemplateButton
                    createPost={(data) => new Promise<void>((resolve, reject) => {
                        createMutation.mutate(data, {
                            onSuccess: () => resolve(),
                            onError: () => reject(),
                        });
                    })}
                    isLoading={createMutation.isPending}
                />

            </div>
            <div className="grid grid-cols-4 gap-6">
                {data?.map((template: Template) => (
                    <TemplatesCard key={template.id} template={template} onDelete={(id) => deleteMutation.mutate(id)} onEdit={() => navigate(`/templates/edit/${template.id}`)} />
                ))}
            </div>
        </div >
    )
}