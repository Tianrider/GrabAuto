import Navigation from "@/components/Navigation";

const Home: React.FC = () => {
    return (
        <div className="flex h-screen w-full flex-col bg-gray-300">
            <h1>Home</h1>
            <Navigation />
        </div>
    );
};

export default Home;
