import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";

const App: FC = () => {
    return (
        <div className="plus-jakarta-sans flex h-screen w-full flex-col">
            <div className="w-full flex-grow overflow-y-scroll sm:w-[30rem]">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
            <Navigation />
        </div>
    );
};

export default App;
