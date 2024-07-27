import {
    Archive,
    Ellipsis,
    MessageSquareText,
    Navigation,
    Phone,
    Power,
    Shield,
    Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home: React.FC = () => {
    const [isProblem, setIsProblem] = useState(false);
    const Navigate = useNavigate();

    return (
        <div className="flex h-full w-full flex-col items-end justify-between overflow-y-scroll">
            {isProblem && (
                <div className="absolute left-[50%] top-[50%] w-2/3 -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] bg-white px-8 py-2 shadow-2xl">
                    <h1 className="text-center text-lg font-bold">
                        Do You Have Problem With Your Vehicle?
                    </h1>
                    <div className="flex items-center justify-between py-5">
                        <button
                            className="rounded-full border-2 border-yellow-500 px-8 py-2 text-yellow-600"
                            onClick={() => setIsProblem(false)}
                        >
                            No
                        </button>
                        <button
                            className="rounded-full border-2 border-yellow-500 bg-yellow-500 px-8 py-2 font-bold text-white"
                            onClick={() => Navigate("/problem")}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3 p-3">
                <div className="flex aspect-square w-12 items-center justify-center rounded-full bg-white shadow-xl">
                    <Shield size={34} className="text-green-800 " />
                </div>
                <div
                    className="flex aspect-square w-12 items-center justify-center rounded-full bg-yellow-500 shadow-xl"
                    onClick={() => setIsProblem(true)}
                >
                    <Wrench size={30} className="text-white" />
                </div>
            </div>

            <img
                src="https://cdn.discordapp.com/attachments/1264860981838872619/1266715461811179541/WhatsApp_Image_2024-07-27_at_18.14.41_9354ba5b.jpg?ex=66a62834&is=66a4d6b4&hm=9e6ef9126d6016628d45bdaada59287c7e9932b1684cbe9173d491cc03f94ee8&"
                alt=""
                className="absolute z-[-1] h-full w-full object-cover"
            />
            <div className="h-1/2 w-full rounded-xl bg-white shadow-xl">
                <div className="flex h-[20%] w-full items-center justify-between border-b-2 border-gray-200 px-8">
                    <div className="flex h-full flex-col items-center justify-center">
                        <p className="flex aspect-square h-1/2 w-auto items-center justify-center rounded-full bg-gray-300 text-lg font-bold">
                            2
                        </p>
                        <p>Stops</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-lg font-bold text-green-500">
                            1 Pick up Item
                        </h1>
                        <p>GrabExpress - Instant</p>
                    </div>
                    <div className="flex h-full flex-col items-center justify-center">
                        <div className="flex aspect-square h-1/2 w-auto items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white">
                            <Navigation size={24} />
                        </div>
                        <p>Navigate</p>
                    </div>
                </div>

                <div className="flex flex-col p-4 text-lg">
                    <p>IKEA Alexandra</p>
                    <p>
                        <span className="font-bold">IKEA Alexandra,</span> 317
                        Alexandra Rd, Singapore 159965
                    </p>
                    <div className="flex gap-4">
                        <p>$10.00</p>
                        <div className="rounded-[5px] bg-blue-700 px-2 text-white">
                            <p>GrabPay</p>
                        </div>
                    </div>
                </div>
                <div className="h-3 bg-gray-200"></div>
                <div className="flex h-1/4 justify-between p-4">
                    <div className="flex w-1/5 flex-col items-center justify-center gap-1 text-center">
                        <Archive size={34} />
                        <p className="text-sm">Order Details</p>
                    </div>
                    <div className="flex w-1/5 flex-col items-center justify-center gap-1 text-center">
                        <MessageSquareText size={34} />
                        <p className="text-sm">Chat With Sender</p>
                    </div>
                    <div className="flex w-1/5 flex-col items-center justify-center gap-1 text-center">
                        <Phone size={34} />
                        <p className="text-sm">
                            Call <br />
                            Sender
                        </p>
                    </div>
                    <div className="flex w-1/5 flex-col items-center justify-center gap-1 text-center">
                        <Ellipsis size={34} />
                        <p className="text-sm">More Actions</p>
                    </div>
                </div>
                <div className="flex gap-4 px-4">
                    <button className="w-5/6 rounded-full border-2 border-green-400  py-4 text-center text-lg font-bold text-green-500">
                        Arrived
                    </button>
                    <button className="flex aspect-square w-1/6 items-center justify-center rounded-full border-2 border-green-500 text-green-500">
                        <Power size={34} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
