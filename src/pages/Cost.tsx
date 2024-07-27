import { ArrowLeft } from "lucide-react";

export default function Cost() {
    return (
        <div className="flex h-full w-full flex-col gap-4 px-4 py-6">
            <div className="z-[-2] absolute left-0 top-0 h-1/3 w-full bg-gradient-to-b from-green-600 to-green-700"></div>
            <div>
                <ArrowLeft className="h-10 w-10 scale-90 text-white" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="mt-10 text-white">
                    <p>
                        We Estimated that the repair <br /> will cost you:{" "}
                    </p>
                </div>
                <div className="text-[1.8rem] flex w-full items-center justify-center font-bold text-white underline">
                    Rp 100.000 - Rp 500.000
                </div>
            </div>
            <div className="rounded-[10px] h-2/3 overflow-y-scroll bg-white shadow-2xl"></div>
            <button className="w-full rounded-full bg-green-600 py-3 text-center font-bold text-white">
                Back Home
            </button>
        </div>
    );
}
