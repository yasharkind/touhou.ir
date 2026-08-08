import CategoryBlock from "@/components/category_block";
import ImageSlider from "@/components/image_slider";
import YoutubeEmbed from "@/components/youtube_embed";
import items from "@/items.json";

/*<Helmet>
        <title>معرفی {char.fullname} توهو | بیوگرافی به فارسی</title>
        <meta property="og:title" content={char.fullname} />
        <meta property="og:description" content={slicedDescription} />
        <meta property="og:image" content={char.prt} />
        <meta property="og:url" content={char.url} />
      </Helmet>*/

export async function generateStaticParams() {
	const filteredList = items.charitems.slice(1).flatMap((i) => i.items);
    return filteredList?.map(character => ({
        character: character.name.toLowerCase(),
    }));
}

export async function generateMetadata({ params }) {
  const { character } = await params;
  const metadata = {
    title: `  به فارسی | توهو ${character.toUpperCase()} بیوگرافی`,
    description:
      "معرفی شخصیت‌های اصلی و محبوب توهو. داستان، قدرت‌ها و رابطه‌ها به فارسی.",

    icons: {
      icon: [{ url: "/icon.png" }],
    },

    openGraph: {
      title: "touhou.ir",
      description:
        "معرفی شخصیت‌های اصلی و محبوب توهو. داستان، قدرت‌ها و رابطه‌ها به فارسی.",
      url: "https://touhou.ir/characters",
      images: [{ url: "https://touhou.ir/homepage/characters.jpg" }],
      siteName: "touhou.ir",
    },
  };

	return metadata;
}

export default async function CharacterPage({ params }) {
  const { character } = await params;
  const filteredList = items.charitems.slice(1).flatMap((i) => i.items);
  const char = filteredList.filter((i) => {
    return i.name?.toLowerCase() == character;
  })[0];

  return (
    <>
      <div className={`scheme-${char.name.toLowerCase()} w-full`}>
        <div className="bg-linear-180 from-3 to-4 min-h-fit flex flex-col justify-center align-center pt-16">
          <div
            className="flex-col items-end lg:items-center justify-center flex bg-5 w-9/10 self-center p-4 rounded-2xl shadow-2xl mb-8 text-1"
            dir="rtl"
          >
            <div className="text-2xl text-right w-full mt-4 mb-4">معرفی:</div>
            <div className="w-full flex lg:flex-row flex-col justify-between">
              <div className="text-xl text-right w-full bg-touhou">
                نام کامل: {char.fullname}
                <br />
                نژاد: {char.race}
                <br />
                <br />
                {char.description}
              </div>
              <div
                style={{
                  background: `url('/chars/${char.name.toLowerCase()}/left.jpg')`,
                  backgroundPosition: char.leftimgoffset || "25%",
                  backgroundRepeat: "no-repeat",
                }}
                className="self-center bg-no-repeat bg-center w-full lg:w-1/2 h-96 object-cover mask-t-from-30% mask-t-to-90% lg:mask-t-from-100% lg:mask-t-to-100% lg:mask-r-from-30% lg:mask-r-to-90% rounded-xl"
              ></div>
            </div>
            <div className="text-2xl text-right w-full mt-4 mb-4">آهنگ ها:</div>
            <div
              className="flex flex-col w-full dejavu justify-center items-center mt-4 mb-4"
              dir="ltr"
            >
              {char.songs?.map((song) => {
                return (
                  <div key={song.name}>
                    <div className="dejavu m-4 text-2xl">
                      {song.name}
                    </div>
                    <audio controls className="w-full">
                      <source src={song.url} type="audio/ogg" />
                    </audio>
                  </div>
                );
              })}
            </div>
            {char.fansongs && (
              <>
                <div className="text-2xl text-right w-full mt-4 mb-4">
                  فن کاورها:
                </div>
                <div className="w-full flex flex-row flex-auto flex-wrap items-center justify-center pt-6 pb-6 ">
                  {char.fansongs?.map((song) => {
                    return <YoutubeEmbed key={song} id={song} />;
                  })}
                </div>
              </>
            )}

            {char.fangames && (
              <>
                <div className="text-2xl text-right w-full mt-4 mb-4">
                  فن گیم ها:
                </div>
                <div className="w-full flex flex-row flex-auto flex-warp items-center justify-center pt-6 pb-6">
                  {char.fangames?.map((game,i) => {
                    return (
                      <CategoryBlock
						key={i}
                        url={game.url}
                        blank={true}
                        title={game.name}
                        img={game.prt}
                        class="text-3xl dejavu"
                      />
                    );
                  })}
                </div>
              </>
            )}
            <div dir="ltr" className="rounded-xl">
              <ImageSlider className="rounded-xl" images={char.sliderimages} />
            </div>
            <a href={char.wikiurl} target="_blank" className="self-center">
              <button className="m-4">
                <div className="sm:text-sm md:text-xl text-sm ">
                  بیشتر (touhou wiki)
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
