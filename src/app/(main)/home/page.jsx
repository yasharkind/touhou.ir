import CategoryBlock from "@/components/category_block";
import ImageSlider from "@/components/image_slider";
import Wip from "@/components/wip";
import locale from "@/locale.json";

/*<Helmet>
		<title>توهو چیست؟ | معرفی دنیای توهو به فارسی</title>
		<meta name="description" content="همه چیز درباره‌ی دنیای توهو: معرفی بازی‌ها، شخصیت‌ها، موسیقی‌ها و آثار طرفداری، مخصوص فارسی‌زبانانی که به انیمه و گیم علاقه دارن."></meta>
		<meta property="og:title" content="touhou iran" />
  		<meta property="og:description" content="کامیونیتی فارسی توهو" />
  		<meta property="og:image" content="https://touhou.ir/icon.png" />
  		<meta property="og:url" content="https://touhou.ir" />
	</Helmet>*/

const recentChanges = ["/games/soku","/games", "/characters/meiling/", "/characters/patchouli/", "/characters/sakuya/","/characters/flandre/"]
const images = [
"/slider/top1.jpg",
"/slider/top2.jpg",
"/slider/top3.jpg",
"/slider/top4.jpg",
"/slider/1306916.jpg",
"/slider/1314592.jpg",
"/slider/1314611.jpg",
"/slider/1314833.png",
"/slider/478488.png",
"/slider/545647.png",
"/slider/672585.jpg",
"/slider/676561.png",
"/slider/685387.jpg",
"/slider/701369.png",
"/slider/837756.png",
"/slider/915109.jpg",
]

export const metadata = {
	title: "توهو چیست؟ | معرفی دنیای توهو به فارسی",
	description: "همه چیز درباره‌ی دنیای توهو: معرفی بازی‌ها، شخصیت‌ها، موسیقی‌ها و آثار طرفداری، مخصوص فارسی‌زبانانی که به انیمه و گیم علاقه دارن.",

	icons: {
		icon: [
			{url: "/icon.png",}
		],
	},

	openGraph: {
		title: "touhou.ir",
		description: "کامیونیتی فارسی توهو",
		url: "https://touhou.ir",
		images: [{url: "https://touhou.ir/icon.png"}],
		siteName: "touhou.ir"
	}

}

export default function Home() {
  return (
    <>
      <div className="scheme-home">
        <Wip />
	  {/*<div className="absolute z-2 right-0">
          <AnimateEnter>
            <div
              className="bg-6 text-2 p-4 m-4 border-[4px] rounded-xl shadow-2xl"
              dir="rtl"
              style={{ background: "#12345699" }}
            >
              <span className="text-1">آخرین آپدیت ها</span>
              {recentChanges.map((url, i) => {
                return (
                  <a key={i} className="dejavu block text-[16px]" href={url}>
                    {url}
                  </a>
                );
              })}
            </div>
          </AnimateEnter>
        </div>*/}
        <ImageSlider images={images} />
        <div className="bg-linear-to-t from-3 to-transparent h-50 w-full absolute -mt-50 z-2" />
        <div className="bg-linear-to-b from-3 to-4 h-fit w-full flex flex-col justify-center items-center pt-16">
          <div className="shadow-4 shadow-[0px_0px_100px] bg-6 items-center justify-items-center flex md:flex-row-reverse md:items-end flex-col w-9/10 rounded-2xl  mb-8">
            <div className="grid self-center w-4/5 lg:w-3/5 mr-8" dir="rtl">
              <h1 className="text-[40px]">{locale.mainpagetitle}</h1>
              <h4 className="lg:text-2xl sm:mt-4 sm:mb-4 mt-4 mb-2">
                {locale.introductiontitle}
              </h4>
              <p className="text-md lg:text-xl">
                {locale.intdoductiontext1}
                <br />
                <br />
                {locale.introductiontext2}
                <br />
                <br />
                {locale.introductiontext3}
              </p>
            </div>
            <div className="md:bg-[url(/homepage/content-left.jpg)] md:w-full md:h-full md:min-h-203.75 bg-no-repeat md:scale-100 md:self-end md:mask-r-from-40% md:mask-r-to-70% md:rounded-l-2xl md:bg-position-[0%] bg-position-[50%-10%] bg-[url(/homepage/content-phone.png)] min-h-90 w-full"></div>
          </div>
          <div className="flex h-max grow shrink basis-[21%] flex-wrap justify-center w-9/10 flex-row-reverse gap-8 mb-8">
            <CategoryBlock
              title="بازی های توهو"
              img="/homepage/games.jpg"
              url="/games"
            />
            <CategoryBlock
              title="موزیک های توهو"
              img="/homepage/music.jpg"
              url="/music"
            />
            <CategoryBlock
              title="فن گیم های توهو"
              img="/homepage/fangames.png"
              url="/fangames"
            />
            <CategoryBlock
              title="مانگا های توهو"
              img="/homepage/manga.jpg"
              url="/manga"
            />
            <CategoryBlock
              title="انیمه های توهو"
              img="/homepage/anime.jpg"
              url="/anime"
            />
            <CategoryBlock
              title="کاراکتر های توهو"
              img="/homepage/characters.jpg"
              url="/characters"
            />
            <CategoryBlock
              title="سرور دیسکورد"
              img="/homepage/discord.jpeg"
              url={locale.serverlink}
              blank={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
