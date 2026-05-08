import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LES 210 — Final Exam Prep",
  description: "American Legal System • Mastery practice for the final",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
