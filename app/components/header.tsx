'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
	{ href: '/', label: 'Tracker' },
	{ href: '/downtimes', label: 'Downtimes' }
]

export default function Header() {
	const pathname = usePathname()

	useEffect(() => {
		const init = async () => {
			const { Collapse, initTE } = await import('tw-elements')
			initTE({ Collapse })
		}
		init()
	}, [])

	useEffect(() => {
		document.querySelector('.animated-hamburger')?.classList.remove('open')
		document.getElementById('navbarSupportedContent')?.classList.add('hidden')
		document
			.getElementById('navbarSupportedContent')
			?.removeAttribute('data-te-collapse-show')
	}, [pathname])

	return (
		<nav
			className='text-xl flex flex-wrap sticky top-0 z-10 w-full items-center justify-between sm:justify-around backdrop-blur-sm py-0.5'
			data-te-navbar-ref
		>
			<Link href='https://lco.global'>
				<Image
					src='/lco-logo-web.png'
					alt='LCO Logo'
					width={170}
					height={150}
					style={{ width: 'auto', height: 'auto' }}
				/>
				<span
					className='font-bold bg-gradient-to-r bg-clip-text text-transparent 
            from-pink-500 via-red-500 to-yellow-500
            background-animate'
				>
					Maintenance Tracker
				</span>
			</Link>
			<button
				id='navbar-toggler'
				className='sm:hidden md:hidden lg:hidden'
				data-te-collapse-init
				data-te-target='#navbarSupportedContent'
				onClick={() =>
					document
						.querySelector('.animated-hamburger')
						?.classList.toggle('open')
				}
				type='button'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<div className='animated-hamburger'>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
			<div
				className='!visible hidden justify-end basis-[100%] sm:!flex sm:basis-auto'
				id='navbarSupportedContent'
				data-te-collapse-item
			>
				<section
					className='flex flex-wrap flex-col sm:flex-row md:flex-row lg:flex-row items-center'
					data-te-navbar-nav-ref
				>
					{links.map(({ label, href }) => (
						<Link
							className={`${
								pathname === href ? 'link-underline-active' : 'link-underline'
							} mx-3 mb-1`}
							key={label}
							href={href}
							data-te-nav-link-ref
						>
							{label}
						</Link>
					))}
				</section>
			</div>
		</nav>
	)
}
