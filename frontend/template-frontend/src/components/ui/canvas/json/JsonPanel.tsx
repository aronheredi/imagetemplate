interface JsonPanelProps {
    text: string;
}

export const JsonPanel = ({ text }: JsonPanelProps) => {
    return (
        <div className="flex flex-col h-full w-96 border-l border-slate-200 bg-slate-100">
            <div className="w-full border-b border-slate-200 bg-white items-center py-7 px-5  mb-4">
                <h1 className="font-bold text-md text-slate-900">Template JSON</h1>
            </div>
            <div className="flex-1 overflow-auto p-4 ">
                <pre className="whitespace-pre-wrap font-mono text-xs text-slate-700 break-words">
                    {text}
                </pre>
            </div>
        </div>
    )
}