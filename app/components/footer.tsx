import Link from 'next/link'
// import { EmailIcon, GithubIcon, LinkedinIcon } from '../../public/icons'
// facebook - https://www.facebook.com/lascumbresobservatory/
// twitter - https://twitter.com/LCO_global
// youtube - https://www.youtube.com/user/lcogt
// instagram - https://www.instagram.com/lco_global/
// github - https://github.com/lcogt/
// email - science-support@lco.global

export default function Footer() {
	return (
		<footer className='flex z-50 items-center place-content-center'>
			<span>&copy; {new Date().getFullYear()} Las Cumbres Observatory</span>
			{/* <Link
				href='mailto:alex.galev@yahoo.com'
				className='ml-5 m-1.5 hover:text-amber-500 dark:hover:text-white'
				target='_blank'
				rel='noreferrer'
				aria-label='Email'
				title='Email'
			>
				<EmailIcon />
			</Link>
			<Link
				href='https://github.com/agalev'
				className='m-1.5 hover:text-amber-500 dark:hover:text-white'
				target='_blank'
				rel='noreferrer'
				aria-label='Github'
				title='Github'
			>
				<GithubIcon />
			</Link>
			<Link
				href='https://www.linkedin.com/in/alexander-galev/'
				className='m-1.5 hover:text-amber-500 dark:hover:text-white'
				target='_blank'
				rel='noreferrer'
				aria-label='LinkedIn'
				title='LinkedIn'
			>
				<LinkedinIcon />
			</Link> */}
		</footer>
	)
}
