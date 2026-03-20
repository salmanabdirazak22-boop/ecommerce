import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Premium Dropshipping Platform",
  description: "High-converting premium ecommerce experience.",
};

import { Header } from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { SmartCart } from "@/components/cart/SmartCart";

import SessionWrapper from "@/components/auth/SessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <CartProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <div style={{ flex: 1 }}>{children}</div>
              <Footer />
            </div>
            <SmartCart />
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
