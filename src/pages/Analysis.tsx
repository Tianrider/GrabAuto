import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import problemsData from "@/data/allProblem";
import Wave from "@/assets/wave.svg";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

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
            <motion.div className="bg-[#34B759] relative flex h-screen w-full flex-col items-center justify-center">
                <div className="absolute left-0 top-0 p-8">
                    <ArrowLeft
                        className="h-10 w-10 text-white"
                        onClick={() => navigate("/problem")}
                    />
                </div>
                <motion.img
                    src={Wave}
                    className="absolute bottom-0 w-full"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                />
                <motion.button
                    className="w-[80%] text-[#428047] absolute bottom-20 h-12 rounded-full bg-white font-bold tracking-wide"
                    onClick={() => navigate("/mechanics")}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    Continue
                </motion.button>
                <div className="flex h-1/2 flex-col justify-center gap-20">
                    <div>
                        <motion.p
                            className="text-lg font-bold text-white"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 1,
                                type: "spring",
                                bounce: 0.5,
                            }}
                        >
                            According to our analysis,
                            <br />
                            you might be dealing with...
                        </motion.p>
                    </div>
                    {problem && (
                        <motion.div
                            className="rotate-[-15deg] flex h-52 w-60 flex-col items-center justify-center gap-2 bg-white p-2 shadow-2xl"
                            initial={{ opacity: 0, y: 100, rotate: 0 }}
                            animate={{ opacity: 1, y: 0, rotate: -15 }}
                            transition={{
                                duration: 1,
                                delay: 1,
                                type: "spring",
                                bounce: 0.5,
                            }}
                        >
                            <div className="h-5/6 w-full">
                                <img
                                    src={problem.imgUrl}
                                    className="h-full w-full object-cover"
                                    alt=""
                                />
                            </div>
                            <p>{problem.title}</p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default Analysis;
