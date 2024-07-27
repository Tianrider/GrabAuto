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
        <div className="flex h-screen w-full flex-col bg-gray-300">
            <h1>Home</h1>
            <Navigation />
        </div>
    );
};

export default Home;
