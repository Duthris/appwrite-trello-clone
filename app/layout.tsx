import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import Modal from "@/components/Modal";

export const metadata: Metadata = {
  title: "Duthris Trello Clone",
  description: "Generated by Duthris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">
        {children}
        <Modal />
      </body>
    </html>
  );
}
