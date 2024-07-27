import Navigation from "@/components/Navigation";

const Home: React.FC = () => {
    return (
        <div className="flex h-full w-full flex-col overflow-y-scroll ">
            {/* Hello Title */}
            <div className="flex h-1/4 items-center justify-center">
                <h1 className="text-2xl font-bold opacity-70">
                    Welcome, User 01
                </h1>
            </div>
        </div>
    );
};

export default Home;
