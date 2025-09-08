import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Personal Branding Builder v2 – Bantu Kamu Bangun Personal Branding Instan!!",
  description: "Personal Branding Builder adalah toolkit digital untuk membantu kamu membangun personal brand dengan profesional, simpel, dan engaging. Cocok untuk pelajar, mahasiswa, kreator, freelancer, maupun bisnis owner.",
  openGraph: {
    title:
      "Personal Branding Builder v2 – Bantu Kamu Bangun Personal Branding Instan!!",
    description:
      "Toolkit digital all-in-one untuk membangun Personal Branding. Cocok untuk pelajar, mahasiswa, kreator, freelancer, maupun bisnis owner.",
    url: "https://app.personalbrandingbuilder.tools",
    siteName: "Personal Branding Builder v2",
    images: [
      {
        url: "https://res.cloudinary.com/dpytrn22z/image/upload/v1757232018/Meta_Image_imcz0t.webp",
        width: 1200,
        height: 630,
        alt: "Personal Branding Builder – Toolkit Branding All in One",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Branding Builder",
    description:
      "Toolkit simpel & profesional untuk bangun personal branding lebih efisien.",
    images: [
      "https://res.cloudinary.com/dpytrn22z/image/upload/v1757232018/Meta_Image_imcz0t.webp",
    ],
    creator: "@kadafidevayana",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
