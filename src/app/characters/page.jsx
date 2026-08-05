import CategoryBlock from "@/components/category_block";
import Footer from "@/components/footer";
import TopBar from "@/components/topbar";
import items from "@/items.json";

/*<Helmet>
        <title>شخصیت‌های توهو | بیوگرافی به فارسی</title>
        <meta name='description' content="معرفی شخصیت‌های اصلی و محبوب توهو. داستان، قدرت‌ها و رابطه‌ها به فارسی." />
        <meta property="og:title" content="touhou iran" />
        <meta property="og:description" content="معرفی شخصیت‌های توهو" />
        <meta property="og:image" content="https://touhou.ir/icon.png" />
        <meta property="og:url" content="https://touhou.ir" />
    </Helmet>
*/

export const metadata = {
	title: "شخصیت‌های توهو | بیوگرافی به فارسی",
	description: "معرفی شخصیت‌های اصلی و محبوب توهو. داستان، قدرت‌ها و رابطه‌ها به فارسی.",

	icons: {
		icon: [
			{url: "/icon.png",}
		],
	},

	openGraph: {
		title: "touhou.ir",
		description: "معرفی شخصیت‌های اصلی و محبوب توهو. داستان، قدرت‌ها و رابطه‌ها به فارسی.",
		url: "https://touhou.ir/characters",
		images: [{url: "https://touhou.ir/homepage/characters.jpg"}],
		siteName: "touhou.ir"
	}

}
export default function CharactersPage() {
  return (
    <>
      <div className="scheme-characters">
        <TopBar />
        <div className="bg-linear-180 from-3 gap-8 to-4 min-h-fit w-full flex flex-col justify-items-center items-center">
          <p className="text-[48px] mt-8">شخصیت‌های توهو</p>
          <div className="gap-8 flex flex-col">
            {items.charitems.map((category, i) => {
              {
                if (!category.items) return;
              }
              return (
                <div
                  className="w-full gap-8 flex justify-items-center items-center flex-col"
                  key={i}
                >
                  <div className="text-3xl dejavu text-7">
                    {category.altname || category.name}
                  </div>
                  <div
                    key={category.name}
                    className="flex gap-16 h-max flex-[1_0_21%] justify-center w-9/10 flex-row-reverse flex-wrap"
                  >
                    {category.items?.map((character) => {
                      return (
                        <CategoryBlock
                          key={character.name}
                          class="dejavu"
                          title={character.name}
                          img={character.prt}
                          url={character.url}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <a
            href="https://www.pixiv.net/en/users/4920496"
            target="_blank"
            className="lg:text-3xl md:text-4xl sm:text-xl text-2 mb-4 hover:text-blue-500 transition"
          >
            منبع همه ی آرت های این صفحه
          </a>
          <Footer />
        </div>
      </div>
    </>
  );
}
