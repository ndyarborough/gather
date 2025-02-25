import { FC } from "react";

interface ToastProps {
    message: string;
    status: string;
};

const Toast : FC<ToastProps> = ({message, status}) => {

    return (
        <div className={status}>
            {message}
        </div>
    )
}

export default Toast;