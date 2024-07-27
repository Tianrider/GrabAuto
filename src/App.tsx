import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import Analysis from "./pages/Analysis";
import Mechanics from "./pages/Mechanics";
import APITest from "./api/APITest";
import Cost from "./pages/Cost";

const App: FC = () => {
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center">
                <div className="sm:w-[30rem] h-full w-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/problem" element={<Problem />} />
                        <Route path="/analysis/:id" element={<Analysis />} />\
                        <Route path="/apitest" element={<APITest />} />
                        <Route
                            path="/mechanics"
                            element={<Mechanics />}
                        ></Route>
                        <Route path="/cost" element={<Cost />}></Route>
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default App;
