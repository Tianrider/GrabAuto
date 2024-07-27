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
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">Response</h1>
            <input
                type="text"
                className="mt-4 w-1/2 rounded-md border  border-gray-300 p-2"
                placeholder="Enter your prompt"
                value={prompt}
                onChange={handlePromptChange}
            />
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
                onClick={fetchApi}
            >
                Generate
            </button>
            {/* Response */}
            <div className="mt-4 w-1/2 rounded-md border border-gray-300 p-4">
                <ReactMarkdown>{response}</ReactMarkdown>
            </div>
        </div>
    );
};

export default Home;
