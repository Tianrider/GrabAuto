import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import problemsData from "@/data/allProblem";
import Wave from "@/assets/wave.svg";
import { ArrowLeft } from "lucide-react";

const Analysis: React.FC = () => {
    const navigate = useNavigate();
    // Get the `id` from URL parameters
    const { id } = useParams<{ id: string }>();

    // Convert the `id` from string to number
    const problemId = parseInt(id ? id : "1", 10);
    console.log(problemId);

    // Find the problem data matching the `id`
    const problem = problemsData.find((p) => p.id === problemId);

    return (
        <>
            <div className="bg-[#34B759] relative flex h-screen w-full flex-col items-center justify-center">
                <div className="absolute left-0 top-0 p-8">
                    <ArrowLeft
                        className="h-10 w-10 text-white"
                        onClick={() => navigate("/problem")}
                    />
                </div>
                <img src={Wave} className="absolute bottom-0 w-full" />
                <button
                    className="w-[80%] text-[#428047] absolute bottom-20 h-12 rounded-full bg-white font-bold tracking-wide"
                    onClick={() => navigate("/mechanics")}
                >
                    Continue
                </button>
                <div className="flex h-1/2 flex-col justify-center gap-20">
                    <div>
                        <p className="text-lg font-bold text-white">
                            According to our analysis,
                            <br />
                            you might be dealing with...
                        </p>
                    </div>
                    {problem && (
                        <div className="rotate-[-15deg] flex h-52 w-60 flex-col items-center justify-center gap-2 bg-white p-2 shadow-2xl">
                            <div className="h-5/6 w-full">
                                <img
                                    src={problem.imgUrl}
                                    className="h-full w-full object-cover"
                                    alt=""
                                />
                            </div>
                            <p>{problem.title}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Analysis;
