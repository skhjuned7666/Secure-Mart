import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Secure-Mart — India's Most Trusted Online Shopping Destination",
  description: "Shop millions of products at unbeatable prices. Electronics, Fashion, Home & more with free delivery, easy returns and 100% secure payment.",
  keywords: "online shopping, electronics, fashion, home, deals, secure payment",
  openGraph: {
    title: "Secure-Mart",
    description: "India's Most Trusted Online Shopping Destination",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
