import { FC } from "react";

interface ToastProps {
    message: string;
    status: string;
}

const Toast: FC<ToastProps> = ({ message, status }) => {
    return (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg text-white ${status === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message}
        </div>
    );
};

export default Toast;
