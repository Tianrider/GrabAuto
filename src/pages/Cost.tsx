import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { getPriceRange } from "@/hooks/useAi";
import LoadingScreen from "@/components/LoadingScreen";
import { useNavigate } from "react-router-dom";

interface CostItem {
    name: string;
    minimum: number;
    maximum: number;
}

export default function Cost() {
    const [costItems, setCostItems] = useState<CostItem[]>([]);
    const [total, setTotal] = useState({ minimum: 0, maximum: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const parseData = (data: string) => {
        const rows = data.split("\n").filter((row) => row.trim() !== "");
        const parsedItems = rows.map((row) => {
            const [name, min, max] = row.split(",");
            return {
                name,
                minimum: Number(min.replace(/\./g, "")),
                maximum: Number(max.replace(/\./g, "")),
            };
        });
        return parsedItems;
    };

    const calculateTotal = (items: CostItem[]) => {
        return items.reduce(
            (totals, item) => {
                return {
                    minimum: totals.minimum + item.minimum,
                    maximum: totals.maximum + item.maximum,
                };
            },
            { minimum: 0, maximum: 0 },
        );
    };

    const fetchCost = async () => {
        setIsLoading(true);
        const prompt = localStorage.getItem("prompt");
        console.log(prompt);
        const priceRange = await getPriceRange(prompt || "");
        console.log(priceRange);
        const parsedItems = parseData(priceRange);
        const calculatedTotal = calculateTotal(parsedItems);
        setCostItems(parsedItems);
        setTotal(calculatedTotal);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCost();
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen />}
            <div className="flex h-full w-full flex-col gap-4 px-4 py-6">
                <div className="z-[-2] absolute left-0 top-0 h-1/3 w-full bg-gradient-to-b from-green-600 to-green-700"></div>
                <div>
                    <ArrowLeft
                        className="h-10 w-10 scale-90 text-white"
                        onClick={() => navigate("/mechanics")}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-white">
                        <p>
                            We estimated that the repair
                            <br />
                            will cost you about:{" "}
                        </p>
                    </div>
                    <div className="flex w-full items-center justify-center text-2xl font-bold text-white underline">
                        Rp {total.minimum.toLocaleString("id-ID")} - Rp{" "}
                        {total.maximum.toLocaleString("id-ID")}
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
                            {costItems.map((item, index) => (
                                <tr key={index} className="h-7">
                                    <td>{item.name}</td>
                                    <td className="text-center">
                                        Rp{" "}
                                        {item.minimum.toLocaleString("id-ID")}
                                    </td>
                                    <td className="text-center">
                                        Rp{" "}
                                        {item.maximum.toLocaleString("id-ID")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="mt-4 h-10 border-t-2 text-xs">
                            <tr className="h-7">
                                <td>Total</td>
                                <td className="text-center">
                                    Rp {total.minimum.toLocaleString("id-ID")}
                                </td>
                                <td className="text-center">
                                    Rp {total.maximum.toLocaleString("id-ID")}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <button
                    className="mt-2 w-full rounded-full bg-green-600 py-3 text-center font-bold text-white"
                    onClick={() => navigate("/")}
                >
                    Back Home
                </button>
            </div>
        </>
    );
}
