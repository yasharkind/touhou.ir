import Link from "next/link";
import AnimateEnter from "./animate_enter";

export default function CategoryBlock({ title, img, url, blank, classname }) {
  return (
    <>
      <AnimateEnter>
        <Link
          prefetch={false}
          className="min-h-max transition hover:scale-120 hover:z-20 relative flex flex-col-reverse bg-linear-to-t from-[#38283b] to-transparent justify-center content-center self-center rounded-4xl h-max shadow-[0px_0px_40px] shadow-8 w-62.5 lg:w-80"
          href={url}
          target={blank ? "_blank" : "_self"}
        >
          <div className="w-full self-center m-0 rounded-b-2xl text-[24px] bg-linear-to-b from-[#59365f] to-[#1a182c] lg:text-[40px] ">
            <div
              className={`text-[#b9b2e0] flex bg-transparent mr-8 ml-8 justify-center relative dejavu koodak ${classname}`}
              dir="rtl"
            >
              {title}
            </div>
          </div>
          <img
            src={`${img}`}
            className="lg:h-80 h-62.5 w-full rounded-t-4xl object-cover"
          />
        </Link>
      </AnimateEnter>
    </>
  );
}
