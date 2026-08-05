"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

function DropDownItem({ item }) {
  const [istoggled, toggle] = useState(false);
  return (
    <div
      className="dejavu"
      onMouseLeave={(_) => toggle(false)}
      onMouseEnter={(_) => toggle(true)}
    >
      <button
        className="flex flex-col border-solid border-2 m-auto"
        onMouseDown={(_) => toggle((last) => !last)}
      >
        {item.name}⌄{" "}
      </button>
      {istoggled && (
        <motion.div
          className="z-10 text-[10px] p-2 lg:p-4.5 flex text-3 absolute right-full top-0 flex-col border-r-4 border-l-4 border-r-[4px] border-l-[4px] bg-4 overflow-hidden transition rounded-2 w-auto "
          initial={{ height: "auto", opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: "auto", opacity: 0 }}
          transition={{ duration: 0 }}
          key={item}
        >
          {item.items.map((innerItem) => {
            return (
              <a
                className="m-1 text-[10px] lg:text-2xl"
                href={innerItem.url}
                key={innerItem.url}
              >
                {innerItem.name}
              </a>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default function TopBarButton(props) {
  /* const [visible, isVisible] = useState(false);
 if (props.items)
    return (
      <div className="h-full hover:cursor-default bg-2 text-[10px] lg:text-lg mr-4 w-full items-center justify-center flex flex-row-reverse">
        <div
          onClick={() => isVisible((last) => !last)}
          onMouseEnter={() => isVisible(true)}
          onMouseLeave={() => isVisible(false)}
        >
          {props.name}
          <div className="absolute bg-5 h-fit w-fit">
            {visible &&
              props.items.map((item, i) => {
                if (item.items) {
                  return <DropDownItem key={i} item={item} />;
                } else {
                  return (
					  <div key={i} className="flex">
                      <a  className="m-auto align-middle items-center text-1 text-lg" href={item.url}>
                        {item.name}
                      </a>
					  </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    );
  */

  return (
    <Link
	  prefetch={true}
      href={props.url}
      className="h-full bg-2 text-[10px] lg:text-lg w-full items-center justify-center flex flex-row-reverse p-2 rounded-lg"
    >
      <button className="hover:cursor-pointer text-4 align-middle text-shadow-black text-shadow-lg  hover:scale-140 transition">
        {props.name}
      </button>
    </Link>
  );
}
