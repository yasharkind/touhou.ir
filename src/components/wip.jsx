"use client";

import { useState } from "react";
import { motion, spring } from "motion/react";

export default function Wip() {
  const [visible, setVisible] = useState();
  useState(() => {
    setTimeout(() => {
      setVisible("opacity-0  pointer-events-none");
    }, 3000);
  }, []);

  return (
      <>
        <div
          className={`fixed transition w-full bottom-0 h-fit text-[60px] z-100 bg-[#33333333] text-[#FF6363] text-center ${visible}`}
          onClick={() => {
            setVisible("opacity-0  pointer-events-none");
          }}
          dir="rtl"
        >
          <div style={{ alignSelf: "center" }}>
            سایت هنوز در حال ساخته شدن است. برای ثبت پیشنهادات وارد سرور دیسکورد
            شوید
          </div>
		<motion.div
		initial = {{width:"full"}}
		animate = {{width: "0px"}}
		transition={{duration: 3, type: "linear"}}
		className="h-2 bg-red-500"></motion.div>
        </div>
      </>
  );
}
