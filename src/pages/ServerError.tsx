import type { FC } from "react";
import { ErrorComponentWithMessageProps } from "../core/components/error-boundary";

export interface ServerErrorPageProps extends ErrorComponentWithMessageProps {
    message?: string;
}

const ServerErrorPage: FC<ServerErrorPageProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            {message || "Server Error"}
        </div>
    );
};

export default ServerErrorPage;
