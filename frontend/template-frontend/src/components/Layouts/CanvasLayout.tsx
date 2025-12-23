import { Outlet } from "react-router-dom";
import { CanvasNavBar } from "../ui/canvas/navigation/CanvasNavBar";

export const EditorLayout = () => {
    return (
        <div className="h-screen bg-slate-50 overflow-hidden">
            <CanvasNavBar />
            <main className="pt-16">
                <Outlet />
            </main>
        </div>
    );
};