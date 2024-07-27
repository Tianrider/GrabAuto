import { ArrowLeft } from "lucide-react";

export default function Cost() {
    return (
        <div className="flex h-full w-full flex-col gap-4 px-4 py-6">
            <div className="z-[-2] absolute left-0 top-0 h-1/3 w-full bg-gradient-to-b from-green-600 to-green-700"></div>
            <div>
                <ArrowLeft className="h-10 w-10 scale-90 text-white" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="text-white">
                    <p>
                        We Estimated that the repair <br /> will cost you:{" "}
                    </p>
                </div>
                <div className="text-[1.8rem] flex w-full items-center justify-center font-bold text-white underline">
                    Rp 100.000 - Rp 500.000
                </div>
            </div>
            <div className="rounded-[10px] flex h-2/3 flex-col items-start overflow-y-scroll bg-white p-4 shadow-2xl">
                <p className="font-bold">Summary</p>
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="w-1/2"></th>
                            <th className="w-1/4">Minimum</th>
                            <th className="w-1/4">Maximum</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        <tr className="h-7">
                            <td>Service Fee</td>
                            <td className="text-center">Rp 50.000</td>
                            <td className="text-center">Rp 100.000</td>
                        </tr>
                        <tr className="h-7">
                            <td>Parts Fee</td>
                            <td className="text-center">Rp 50.000</td>
                            <td className="text-center">Rp 100.000</td>
                        </tr>
                    </tbody>
                    <tfoot className="mt-4 h-10 border-t-2 text-xs">
                        <tr className="h-7">
                            <td></td>
                            <td className="text-center">Rp 100.000</td>
                            <td className="text-center">Rp 200.000</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <button className="mt-2 w-full rounded-full bg-green-600 py-3 text-center font-bold text-white">
                Back Home
            </button>
        </div>
    );
}
