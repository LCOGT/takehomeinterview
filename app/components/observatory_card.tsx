import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { Observatory, Telescope } from '../interfaces'
import { GlobalState } from '../global-state'
import FormModal from './form_modal'

export default function ObservatoryCard(site: Observatory) {
	const global = useContext(GlobalState)
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		const init = async () => {
			const { Ripple, initTE } = await import('tw-elements')
			initTE({ Ripple })
		}
		init()
	}, [])

	const handleFormDisplay = () => {
		setIsModalOpen(true)
	}

	const currentDate = new Date()

	const utcYear = currentDate.getUTCFullYear()
	const utcMonth = currentDate.getUTCMonth()
	const utcDay = currentDate.getUTCDate()
	const utcHours = currentDate.getUTCHours()
	const utcMinutes = currentDate.getUTCMinutes()
	const utcSeconds = currentDate.getUTCSeconds()

	const utcDate = new Date(
		Date.UTC(utcYear, utcMonth, utcDay, utcHours, utcMinutes, utcSeconds)
	)

	const determineStatus = (telescope: string) => {
		return global?.state.downtimes.some(
			(down_telescope) =>
				down_telescope.telescope === telescope &&
				new Date(down_telescope.start_date) <= utcDate &&
				new Date(down_telescope.end_date) >= utcDate
		) ? (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				className='h-6 w-6 text-red-500 mr-1'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M6 18L18 6M6 6l12 12'
				/>
			</svg>
		) : (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				className='h-6 w-6 text-green-500 mr-1'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M5 13l4 4L19 7'
				/>
			</svg>
		)
	}

	return (
		<article className='text-center overflow-hidden max-w-sm min-w-fit m-2 p-1 rounded-lg border border-amber-500 bg-neutral-400 shadow-lg dark:bg-neutral-800'>
			<Image
				src={site.image}
				alt={site.name}
				width={300}
				height={300}
				className='mx-auto my-3 rounded-xl hover:scale-110 transition duration-500 cursor-pointer object-cover'
				style={{ width: 'auto', height: 'auto' }}
			/>
			<h3 className='text-xl font-bold inline-block underline'>{site.name} </h3>
			<h4 className='text-lg font-medium mb-2'>{site.description}</h4>
			<h4 className='text-lg font-medium mb-2'>
				Location:
				<br /> Latitude: {site.location.latitude}
				<br /> Longtitude: {site.location.longitude}
			</h4>
			<span className='text-lg font-medium mb-2'>
				Elevation: {site.elevation}m<br />
				Timezone: {site.timezone}, Code: {site.code}
			</span>
			<ul className='text-lg font-medium'>
				Telescopes:
				{site.telescopes.map((telescope: Telescope) => (
					<li className='flex ml-5 text-md' key={telescope.id}>
						{determineStatus(
							`id:${telescope.id}, ${telescope.name.toLowerCase()}`
						)}
						{telescope.name}
					</li>
				))}
			</ul>
			<button
				className='w-full rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
				data-te-ripple-init
				data-te-ripple-color='light'
				style={{
					backgroundImage:
						'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
				}}
				onClick={handleFormDisplay}
			>
				Record Downtime at this observatory
			</button>
			{isModalOpen && (
				<FormModal
					site={site.code}
					telescopes={site.telescopes}
					close={() => setIsModalOpen(false)}
				/>
			)}
		</article>
	)
}
