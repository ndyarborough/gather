import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { EventsProvider } from "./events/context/EventsContext";
import { ToastProvider } from "@/context/ToastContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-screen">
        <ToastProvider>
          <EventsProvider>
            <UserProvider>{children}</UserProvider>
          </EventsProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
