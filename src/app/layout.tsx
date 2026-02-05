import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
