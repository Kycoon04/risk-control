import type { Metadata } from "next";
import "./ui/globals.css";
import { montserrat } from './ui/fonts';

export const metadata: Metadata = {
  title: "Control de riesgoW",
  description: "Control de registro para una entidad publica 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
