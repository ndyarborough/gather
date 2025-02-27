import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { EventsProvider } from "@/context/EventsContext";

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
