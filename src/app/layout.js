import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "توهو چیست؟ | معرفی دنیای توهو به فارسی",
  description:
    "همه چیز درباره‌ی دنیای توهو: معرفی بازی‌ها، شخصیت‌ها، موسیقی‌ها و آثار طرفداری، مخصوص فارسی‌زبانانی که به انیمه و گیم علاقه دارن.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
