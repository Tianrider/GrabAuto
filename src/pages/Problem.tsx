import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import Wrench from "@/assets/wrench.svg";

import Navigation from "../components/Navigation";
import ProblemCard from "@/components/ProblemCard";

import { ArrowRight } from "lucide-react";
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
        <div className="flex h-screen w-full flex-col items-center pt-[7.5rem] relative">
            <img src={Wrench} className="h-36 absolute left-0 top-1 z-10" />
            <div className="bg-[#f2f9fb] w-full h-44 absolute z-[-5] top-0"/>
            <div className="w-full px-4">
                <p className="text-start text-xl font-semibold">
                    What can we help you with?{" "}
                    <a className="text-xs font-bold text-[#6dbb6c]">
                        AI-powered
                    </a>
                </p>
            </div>
            <div className="mt-2 flex h-12 w-[94vw] flex-row space-x-0 mx-4 shadow-md rounded-md overflow-hidden">
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
