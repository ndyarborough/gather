'use client';

import { createContext, ReactNode, useState } from "react";

interface ToastContextType {
    message: string;
    status: string;
    setToast: (message: string, status: string) => void;
}

export const ToastContext =  createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({children} : {children: ReactNode}) => {
    const [message, setMessage] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const setToast = (message: string, status: string) => {
        setMessage(message);
        setStatus(status);
    }

    return (
        <ToastContext.Provider value={{message, status, setToast}}>
            {children}
        </ToastContext.Provider>
    )
}
