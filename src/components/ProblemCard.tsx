import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types/types";

const ProblemCard: React.FC<CardProps> = (cardProps: CardProps) => {

    const navigate = useNavigate();
    const handleOnClick = () => {
        localStorage.setItem("prompt", cardProps.title || "");
        navigate(`/mechanics`);
    }

    return (
        <div className="m-0 flex h-36 w-full flex-col gap-3 space-y-0 overflow-hidden rounded-lg  p-0" onClick={handleOnClick}>
            <div className="h-[80%]">
                <img
                    src={
                        cardProps.imageUrl ||
                        "https://images.unsplash.com/photo-1536500152107-01ab1422f932?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
                    }
                    className="h-full w-full rounded-[5px] object-cover"
                />
            </div>
            <div className="">
                <p className="text-sm font-semibold">
                    {cardProps.title || "Weird sound coming from my AC unit"}
                </p>
                <p></p>
            </div>
        </div>
    );
};

export default ProblemCard;
