/*<Helmet>
		<title>توهو چیست؟ | معرفی دنیای توهو به فارسی</title>
		<meta name="description" content="دانلود بازی های توهو"></meta>
		<meta name="keywords" content="سوکو soku hisoutensoku touhou دانلود بازی  توهو"></meta>
		<meta property="og:title" content="Touhou Games" />
  		<meta property="og:description" content="دانلود بازی های توهو | کامیونیتی فارسی توهو" />
  		<meta property="og:image" content="https://touhou.ir/icon.png" />
  		<meta property="og:url" content="https://touhou.ir/games" />
	</Helmet>*/

import CategoryBlock from "@/components/category_block";
import Footer from "@/components/footer";
import TopBar from "@/components/topbar";
import items from "@/items.json";
import Image from "next/image";

export default function GamePage() {
  return (
    <>
      <div className="scheme-sakuya">
        <TopBar />

        {/*<ImageSlider images={["/slider/soku1.jpeg"]}/>*/}
        <div className=" w-full h-[50vh] justify-center relative inline-block overflow-hidden">
          <Image className="object-cover w-full h-full overflow-hidden block transition shrink-0 grow-0" src="/slider/soku1.jpeg" />
          <a href="games/soku">
            <button className="hover:scale-125 transition text-2 h-fit w-fit bg-[#aa448840] rounded-full p-6 text-md lg:text-[24px] absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 img-center translate-full text-center koodak">
              دانلود و آموزش بازی سوکو
            </button>
          </a>
        </div>

        <div className="fade2" />
        <div className="h-fit w-full bg-pink-300 pt-10">
          <center className="mb-8 lg:text-[48px] text-2xl ">
            <h1>بازی های توهو</h1>
          </center>
          <div className="flex flex-col bg-[black]">
            <div className="bg-2 mt-1">
              <center className="text-xl lg:text-2xl mt-6">
                <h2>بازی های اصلی</h2>
              </center>
              <div className="bg-2 justify-center flex flex-wrap gap-8 mt-8 mb-8 ">
                {items.gameitems[1].items.slice(1).map((v, k) => {
                  return (
                    <CategoryBlock
                      url={v.dllink}
                      title={v.name}
                      img={v.img}
                      key={k}
                    >
                      {v.name}
                    </CategoryBlock>
                  );
                })}
              </div>
            </div>
            <div className="bg-2 mt-1">
              <center className="text-2xl mt-6">
                <h2 className="leading-none">بازی های فایتینگ</h2>
              </center>
              <div className="justify-center flex flex-wrap gap-8 mt-8 mb-8 ">
                {items.gameitems[2].items.slice(1).map((v, k) => {
                  return (
                    <CategoryBlock
                      url={v.dllink}
                      title={v.name}
                      img={v.img}
                      key={k}
                    >
                      {v.name}
                    </CategoryBlock>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
