import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import DashboardSidebar from '@/components/ui/DashboardSidebar';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen bg-gray-50">
          <DashboardSidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
