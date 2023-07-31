import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMediaQuery } from '../utils/useMediaQuery'
import avatar from '/avatar.png'

const navMotion = {
	visible: {
		opacity: 1,
		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.15,
		},
	},
	hidden: {
		opacity: 0
	}
}

const itemMotion = {
	visible: { opacity: 1, x: 0 },
	hidden: { opacity: 0, x: -100 }
}

export default function Navbar() {
	const [toggled, setToggled] = useState(false)
	const matches = useMediaQuery('(min-width: 1200px)')

	const isToggled = (isSetToggled) => {
		setToggled(isSetToggled)
		const isScrolled = !toggled ? 'hidden' : 'auto'

		document.body.style.overflow = isScrolled
	}

	return (
		<nav className="relative mx-8 mb-24 flex justify-between items-center pt-8 pb-4 font-medium md:mx-16 lg:mx-32">
			<svg className="absolute bottom-0 left-1/2 -translate-x-1/2" width="250" height={4} viewBox="0 0 250 4" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2 2L428 2" stroke="#2d2d2d" strokeWidth={2} strokeLinecap="round" />
			</svg>

			<div>
				<img src={avatar} width={ matches ? 48 : 38} height={ matches ? 48 : 38} alt="Profile Picture" />
			</div>

			{/* Title */}
			<h1 className="text-xl font-bold">
				<a href="/" className="text-slate-800">Rzq.</a>
			</h1>

			{ matches && (
				<div className="flex gap-12 text-slate-700">
					<a href="/" className="transition-all hover:text-orange-500">Home</a>
					<a href="/services" className="transition-all hover:text-orange-500">Services</a>
					<a href="/contact" className="transition-all hover:text-orange-500">Contact</a>		
				</div>
			) }
			
			{ !matches && (
				// <div onClick={() => setToggled((prevToggled) => !prevToggled)} className="space-y-1.5 cursor-pointer z-50">
				<div onClick={() => isToggled(!toggled)} className="space-y-1.5 cursor-pointer z-50">
					<motion.span animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }} className="block h-0.5 w-8 bg-slate-800"></motion.span>
					<motion.span animate={{ width: toggled ? 0 : 24, opacity: toggled ? 0 : 1 }} initial={{ opacity: !toggled ? 1 : 0 }} className="block h-0.5 w-6 bg-slate-800"></motion.span>
					<motion.span animate={{ rotateZ: toggled ? -45 : 0, y: toggled ? -8 : 0, width: toggled ? 32 : 24 }} className="block h-0.5 w-4 bg-slate-800"></motion.span>
				</div>
			) }

			{ toggled && !matches && (
				<div className="fixed bg-white left-0 bottom-0 w-full h-screen flex items-center justify-center z-[49]">
					<motion.div variants={navMotion} animate="visible" initial="hidden" className="text-slate-700 flex flex-col items-center text-xl gap-y-11">
						<motion.a variants={itemMotion} href="/" className="transition-all hover:text-orange-500">Home</motion.a>
						<motion.a variants={itemMotion} href="/services" className="transition-all hover:text-orange-500">Services</motion.a>
						<motion.a variants={itemMotion} href="/contact" className="transition-all hover:text-orange-500">Contact</motion.a>
					</motion.div>
				</div>
			) }
		</nav>
	)
}