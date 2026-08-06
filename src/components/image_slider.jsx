"use client";

import { useEffect, useRef, useState } from "react";

export default function ImageSlider({images, className}) {
	const [image, setImage] = useState(0);
	var manual = useRef(false)
	const manualTimeout = useRef(null);
	useEffect(() => {
		const interval = setInterval(() => {
			if(!manual.current) setImage(prev => (prev + 1) % images.length)
		}, 3000);

		return () => clearInterval(interval);
	}, [])
	const handleManualNavigation = (direction) => {
		manual.current = true;

		if (manualTimeout.current) {
			clearTimeout(manualTimeout.current);
		}

		manualTimeout.current = setTimeout(() => {
			manual.current = false;
		}, 5000);

		setImage(prev =>
			direction === 'next'
				? (prev + 1) % images.length
				: (prev + images.length - 1) % images.length
		);
	};
	return (
		<>
			<div className={`w-full lg:h-[60vh] h-[30vh] overflow-hidden flex ${className} relative`}>
				<button className="slider-button absolute h-20 bg-2 z-100 w-16 ml-2 rounded-4xl top-1/2 -translate-y-1/2" onClick={() => handleManualNavigation("prev")}>
					<img src="/slider/left.svg" className="scale-50" />
				</button>
				<button className="sm:w-16 w-12.5 absolute h-20 bg-2  rounded-4xl mr-2 text-2 z-100 top-1/2 -translate-y-1/2 right-0" onClick={() => handleManualNavigation("next")}>
					<img src="/slider/right.svg" className="scale-50" />
				</button>
				{images.map(img => (
					<img src={`${img}`} key={img} className='object-cover shrink-0 relative h-full w-full transition ease-in-out' style={{ translate: `${image * -100}%` }} />
				))}
			</div>
		</>
	)
}
