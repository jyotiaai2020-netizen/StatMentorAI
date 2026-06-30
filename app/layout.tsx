import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lotus & Dorje Portal",
  description: "Enterprise SaaS portal for analytics, organizations, and reports.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
