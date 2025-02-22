import { UserProvider } from "@/context/UserContext";
import "./globals.css";
import { EventsProvider } from "./events/context/EventsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-screen">
        <EventsProvider>
          <UserProvider>{children}</UserProvider>
        </EventsProvider>
      </body>
    </html>
  );
}
