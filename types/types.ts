interface CardProps {
    title?: string;
    description?: string;
    imageUrl?: string;
}

interface ProblemProps {
    title: string;
    imgUrl: string;
    id: number;
}

export type { CardProps, ProblemProps };
