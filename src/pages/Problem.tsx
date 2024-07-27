import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import Wrench from "@/assets/wrench.svg";

import ProblemCard from "@/components/ProblemCard";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { CardProps } from "types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import problemsData from "@/data/problemsData";

import "swiper/css";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY as string);

const ProblemSwiper: React.FC = () => {
    return (
        <Swiper slidesPerView={2.5} spaceBetween={10} className="w-full">
            {problemsData.map((problem) => (
                <SwiperSlide key={problem.id} className="h-fill w-full">
                    <ProblemCard
                        title={problem.title}
                        imageUrl={problem.imgUrl}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

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
        <div className="relative flex w-full flex-col items-center pt-[7.5rem]">
            <img
                src={Wrench}
                className="absolute -top-7 left-52 z-10 h-36 rotate-45"
            />
            <div className="absolute left-6 top-8">
                <button>
                    <ArrowLeft className="scale-125" />
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
                        className="h-12 w-full px-4 focus:rounded-none"
                        placeholder="I have weird sound coming from my AC..."
                    ></input>
                </div>

                <div className="flex h-12 w-14 items-center justify-center bg-[#6dbb6c]">
                    <ArrowRight className="scale-90 text-white" />
                </div>
            </div>
            <div className="mt-4 flex w-full flex-col gap-4 px-4">
                <p className="text-start text-xl font-semibold">
                    Common Problems
                </p>
                <ProblemSwiper />
                <div className="mt-4 flex h-20 w-full items-center justify-center rounded-xl border-2 border-gray-300">
                    <img
                        src="https://logos-download.com/wp-content/uploads/2018/03/Grab_logo_green.png"
                        alt=""
                        className="h-6"
                    />
                </div>
            </div>
            <div className="mt-6 flex w-full flex-col gap-4 bg-gradient-to-b from-red-500/50 to-transparent px-4 py-4">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl font-semibold text-red-800">
                        Severe Problem
                    </h1>
                    <ArrowRight className="scale-100 rounded-full bg-red-500/50 p-1 text-white" />
                </div>
                <ProblemSwiper />
            </div>
            <div className="flex w-full flex-col gap-4 bg-gradient-to-b from-yellow-500/50 to-transparent px-4 py-4">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl font-semibold text-yellow-800">
                        Medium Problem
                    </h1>
                    <ArrowRight className="scale-100 rounded-full bg-yellow-500/60 p-1 text-white" />
                </div>
                <ProblemSwiper />
            </div>
        </div>
    );
};

export default Problem;
