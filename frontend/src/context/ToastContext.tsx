'use client';
import { createContext, ReactNode, useState } from "react";
import Toast from "../components/Toast";

interface ToastContextType {
    setToast: (message: string, status: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);

    const setToast = (message: string, status: string) => {
        setMessage(message);
        setStatus(status);
        setVisible(true);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ setToast }}>
            {children}
            {visible && <Toast message={message} status={status} />}
        </ToastContext.Provider>
    );
};
