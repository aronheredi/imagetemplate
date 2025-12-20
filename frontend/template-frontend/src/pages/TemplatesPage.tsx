import api from "@/api/axios"
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
    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['templates'] });
        }
    })
    if (isLoading) return <div>Loading your templates...</div>
    if (isError) return <div>There was an error loading your templates.Try refreshing.</div>
    return (
        <div className="mx-auto max-w-screen-xl" >
            <div className="flex flex-row items-center justify-between py-6">
                <div className="flex flex-col ">
                    <h1 className="text-2xl text-slate-900 font-bold mb-4">Templates Page</h1>
                    <p className="text-slate-500">Manage and create your image generation templates.</p>
                </div>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 text-white shadow-sm transition-all active:scale-95">
                    Create New Template
                </button>
            </div>
            <div className="grid grid-cols-4 gap-6">
                {data?.map((template: Template) => (
                    <TemplatesCard key={template.id} template={template} onDelete={(id) => mutation.mutate(id)} onEdit={() => navigate(`/templates/edit/${template.id}`)} />
                ))}
            </div>
        </div >
    )
}