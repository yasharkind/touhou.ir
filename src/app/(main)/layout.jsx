import TopBar from "@/components/topbar";
import Footer from "@/components/footer";


export const metadata = {
  title: "توهو چیست؟ | معرفی دنیای توهو به فارسی",
  description:
    "همه چیز درباره‌ی دنیای توهو: معرفی بازی‌ها، شخصیت‌ها، موسیقی‌ها و آثار طرفداری، مخصوص فارسی‌زبانانی که به انیمه و گیم علاقه دارن.",
};

export default function RootLayout({ children }) {
	
  return (
      <body className={`min-h-full flex flex-col`}>
<TopBar />
	  {children}
<Footer />
	  </body>
  );
}
