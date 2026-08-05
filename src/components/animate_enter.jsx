"use client";

import {motion} from "motion/react"

export default function AnimateEnter(
	{children}
) {
	return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}
