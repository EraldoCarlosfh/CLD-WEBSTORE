import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { AuthProvider } from "@/providers/auth";
import CartProvider from "@/providers/cart";
import ToastProvider from "@/providers/toast";
import { Suspense } from "react";
import LoadingPage from "@/components/ui/loading";
import { Toaster } from "sonner";
import "../../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CLD Store",
  description: "Loja Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <Header />
                <Suspense fallback={<LoadingPage/>}>
                  <div className="flex-1">{children}</div>
                </Suspense>
                <Toaster />
                <Footer />
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
