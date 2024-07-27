import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Problem from "./pages/Problem";

const App: FC = () => {
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center">
                <div className="w-full sm:w-[30rem]">
                    <Routes>
                        <Route path="/" element={<Problem />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default App;
