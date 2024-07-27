import Navigation from "@/components/Navigation";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY as string);

const Home: React.FC = () => {
    const [prompt, setPrompt] = useState<string>("");
    const [response, setResponse] = useState<string>("");

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const fetchApi = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        setResponse(text);
    };

    return (
        <div className="flex h-screen w-full flex-col bg-gray-300">
            <h1>Home</h1>
            <Navigation />
        </div>
    );
};

export default Home;
