import { Inter } from "next/font/google";
import "../globals.css";
import { UserProvider } from "../context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white h-screen flex`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
