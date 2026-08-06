import Link from "next/link";
import TopBarButton from "./topbar_botton";
import items from "@/items.json";

export default function TopBar() {
  return (
    <>
      <div className="transition h-23.5 lg:h-30 w-full t-0 bg-2 flex shadow-6 shadow-[0px_8px_24px_8px] relative z-10 flex-row-reverse content-around justify-between">
      <div className="self-center w-fit flex ml-4 mr-4 gap-4">  
            <TopBarButton
              icon="games.png"
              alt="Games"
              url="/games"
              name="Games"
              items={items.gameitems}
            />
            <TopBarButton
              icon="music.png"
              alt="Music"
              url="/music"
              name="Music"
              items={items.musicitems}
            />
            <TopBarButton
              icon="characters.png"
              alt="Characters"
              url="/characters"
              name="Characters"
              items={items.charitems}
            />
	  </div>
        <div className="w-fit ml-4 drop-shadow-[5px_5px_5px_#222] leading-normal text-7 content-center">
          <Link prefetch={false} href="/home">
            <div className="text:[10px] sm:text-[4vh] md:text-[5vh] hover:scale-125 hover:translate-x-5 transition">touhou.ir</div>
          </Link>
        </div>
      </div>
    </>
  );
}
