import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";

const App: FC = () => {
    return (
        <>
            <div className="plus-jakarta-sans flex h-screen w-full items-center justify-center">
                <div className="relative h-full w-full sm:w-[30rem]">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default App;
