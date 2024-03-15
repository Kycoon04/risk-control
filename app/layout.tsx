import type { Metadata } from "next";
import "./ui/globals.css";
import { poppins } from './ui/fonts';

export const metadata: Metadata = {
  title: "Control de riesgo",
  description: "Control de registro para una entidad publica 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
