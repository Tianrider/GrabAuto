import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import Wrench from "@/assets/wrench.svg";

import ProblemCard from "@/components/ProblemCard";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { CardProps } from "types/types";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY as string);

const Problem: React.FC = () => {
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
        <div className="relative flex h-screen w-full flex-col items-center pt-[7.5rem]">
            <img src={Wrench} className="absolute left-52 -top-7 z-10 h-36 rotate-45" />
            <div className="absolute top-8 left-6">
                <button>
                    <ArrowLeft className="scale-125"/>
                </button>
            </div>
            <div className="absolute top-0 z-[-5] h-44 w-full bg-[#f2f9fb]" />
            <div className="w-full px-4">
                <p className="text-start text-xl font-semibold">
                    What can we help you with?{" "}
                    <a className="text-xs font-bold text-[#6dbb6c]">
                        AI-powered
                    </a>
                </p>
            </div>
            <div className="mx-4 mt-2 flex h-12 w-[94vw] flex-row space-x-0 overflow-hidden rounded-md shadow-md">
                <div className="w-full">
                    <input
                        className="h-12 w-full px-4"
                        placeholder="I have weird sound coming from my AC..."
                    ></input>
                </div>

                <div className="flex h-12 w-14 items-center justify-center bg-[#6dbb6c]">
                    <ArrowRight className="scale-90 text-white" />
                </div>
            </div>
            <div className="mt-4 w-full px-4">
                <p className="text-start text-xl font-semibold">
                    Common Problems
                </p>
            </div>
        </div>
    );
};

export default Problem;
