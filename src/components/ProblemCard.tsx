import { CardProps } from "../../types/types";

const ProblemCard: React.FC<CardProps> = (cardProps: CardProps) => {
    return (
        <div className="m-0 flex h-36 w-full flex-col space-y-0 overflow-hidden rounded-lg bg-white p-0">
            <div className="h-[33%]">
                <img
                    src={
                        cardProps.imageUrl ||
                        "https://images.unsplash.com/photo-1536500152107-01ab1422f932?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
                    }
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="px-2 pt-0.5">
                <p className="font-semibold text-sm">{cardProps.title || "Weird sound coming from my AC unit"}</p>
                <p>

                </p>
            </div>
        </div>
    );
};

export default ProblemCard;
