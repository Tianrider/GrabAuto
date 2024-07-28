import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import Analysis from "./pages/Analysis";
import Mechanics from "./pages/Mechanics";
import APITest1 from "./api/APITest_Step1";
import APITest2 from "./api/APITest_Step2";
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
                        <Route path="/apitest1" element={<APITest1 />} />
                        <Route path="/apitest2" element={<APITest2 />} />
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
