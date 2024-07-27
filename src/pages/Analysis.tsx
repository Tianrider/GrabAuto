import React from "react";

import Wave from "@/assets/wave.svg";

const Analysis: React.FC = () => {
    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#34B759]">
            <img src={Wave} className="absolute bottom-0 w-full" />
            <button className="h-12 w-[80%] rounded-full bg-white absolute bottom-20 font-bold tracking-wide text-[#428047]">Continue</button>
            <div>
                <p className="text-white text-lg">According to our analysis,
                    <br/>
                    you might be dealing with...
                </p>
            </div>
        </div>
    );
};

export default Analysis;
