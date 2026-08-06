"use client";

import { useState } from "react";

export default function Wip() {
	const [visible, setVisible] = useState(true)

	return visible && <>
			<div className="flex fixed w-full h-full text-[70px] items-center z-50 bg-[#1F1F1F99] text-[#FF6363] text-center" onClick={() => { setVisible(() => false) }} dir='rtl'>
				<div style={{ alignSelf: "center" }}>
					سایت هنوز در حال ساخته شدن است. برای ثبت پیشنهادات وارد سرور دیسکورد شوید
				</div>
			</div>
		</>
}
