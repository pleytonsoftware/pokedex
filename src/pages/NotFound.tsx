import type { FC } from "react";

export interface NotFoundPageProps {
    message?: string;
}

const NotFoundPage: FC<NotFoundPageProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            {message || "Page Not found"}
        </div>
    );
};

export default NotFoundPage;
