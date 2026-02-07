import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";

export const metadata: Metadata = {
  title: "USAgent — Population Registry for AI Agents",
  description: "Agents join the nation using a simple curl command. Humans may observe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0b0b0b] text-2xl dark">
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
