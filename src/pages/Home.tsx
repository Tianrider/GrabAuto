import Navigation from "@/components/Navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect } from "react";

const Home: React.FC = () => {
    const genAI = new GoogleGenerativeAI(
        "AIzaSyDnSqH16xmI32dm3QeHyHV-rRp-d79G-uk",
    );

    const fetchApi = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "What is the meaning of life?";
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(text);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div className="flex h-full w-full flex-col overflow-y-scroll ">
            {/* Hello Title */}
            <div className="flex h-1/4 items-center justify-center">
                <h1 className="text-2xl font-bold opacity-70">
                    Welcome, User 01
                </h1>
            </div>
        </div>
    );
};

export default Home;
