"use client";
import Link from "next/link";
import TopBarButton from "./topbar_botton";
import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const links = [
	{
    icon: "home.png",
    alt: "Home",
    url: "/home",
    name: "Home",
  },
  {
    icon: "games.png",
    alt: "Games",
    url: "/games",
    name: "Games",
  },
  {
    icon: "music.png",
    alt: "Music",
    url: "/music",
    name: "Music",
  },
  {
    icon: "characters.png",
    alt: "Characters",
    url: "/characters",
    name: "Characters",
  },
];

export default function TopBar({}) {
  const pathname = usePathname();
  const buttonRefs = useRef({});
  const [selector, setSelector] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  useLayoutEffect(() => {
	  const path = pathname.replace(/\/$/g, "");
    const button = buttonRefs.current[path];

    if (!button) return;

    setSelector({
      left: button.offsetLeft - 15,
      top: button.offsetTop,
      width: button.offsetWidth,
      height: button.offsetHeight,
    });
  }, [pathname]);
  return (
    <>
      <div className={`transition h-23.5 lg:h-30 w-full t-0 bg-2 flex shadow-6 shadow-[0px_8px_24px_8px] relative z-10 flex-row-reverse content-around justify-between scheme-${pathname.match(/^\/([^\/]+)\//)[1]}`}>
        <nav className="self-center w-fit flex ml-4 mr-4 gap-4">
	  {links.map((v,i) => <TopBarButton
            icon={v.icon}
            alt={v.alt}
            url={v.url}
            name={v.name}
		    ref={(el) => buttonRefs.current[v.url] = el}
		    key={i}
          />)}
        </nav>

        <motion.div
          className="absolute border-[3px] border-dotted border-5 w-fit h-fit self-center ml-4 drop-shadow-[5px_5px_5px_#222] transition leading-normal text-7 content-center  p-2 rounded-lg"
          animate={{
            left: selector.left,
            top: selector.top,
            width: selector.width,
            height: selector.height,
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <div className="w-fit h-fit self-center ml-4 drop-shadow-[5px_5px_5px_#222] transition hover:scale-125 hover:translate-x-5 leading-normal text-7 content-center  p-2">
          <Link id="test" prefetch={false} href="/home">
            <div className="text:[10px] sm:text-[4vh] md:text-[5vh]">
              touhou.ir
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
