import { UserProvider } from "@/context/UserContext";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-screen">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
