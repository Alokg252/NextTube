import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code With Me",
  description: "Amazing Courses on Programming",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  
  return (
    <html lang="en">
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  );
}
