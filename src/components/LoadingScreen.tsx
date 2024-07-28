import { Wrench } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="h-screen w-full flex items-center justify-center absolute z-20 bg-black bg-opacity-90">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-bounce">
                    <Wrench size={64} className="text-green-600"/>
                </div>
                <div className="text-white text-2xl font-bold">Loading...</div>
            </div>
        </div>
    );
}