import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OKOnline - The Global Marketer",
  description: "Tech-enabled marketing for SaaS & Mobile Apps. Transform your business with Meta Ads, WhatsApp automation, and email campaigns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
