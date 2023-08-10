'use client'
import { useEffect } from 'react'

export default function Toaster({
	message,
	type
}: {
	message: string
	type: string
}) {
	useEffect(() => {
		async function init() {
			const te = await import('tw-elements')
			await te.initTE({ Toast: te.Toast })
		}
		init()
	}, [])

	const toast_types: { [key: string]: string } = {
		info: 'primary',
		success: 'success',
		warning: 'warning',
		error: 'danger'
	}

	const toast_icons: { [key: string]: string } = {
		info: 'M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z',
		success:
			'M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z',
		warning:
			'M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z',
		error:
			'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'
	}

	return (
		<div
			className={`fixed bottom-5 right-5 z-50 flex justify-content pointer-events-auto w-96 rounded-lg bg-${toast_types[type]}-100 bg-clip-padding text-sm !text-${toast_types[type]}-700 shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden`}
			id='static-example'
			role='alert'
			aria-live='assertive'
			aria-atomic='true'
			data-te-autohide='false'
			data-te-toast-init
			data-te-toast-show
		>
			<div
				className={`flex items-center justify-between rounded-t-lg !bg-${toast_types[type]}-100 bg-clip-padding px-4 pb-2 pt-2.5 !text-${toast_types[type]}-700`}
			>
				<p
					className={`flex items-center font-bold !text-${toast_types[type]}-700`}
				>
					<svg
						aria-hidden='true'
						focusable='false'
						data-prefix='fas'
						data-icon='times-circle'
						className='mr-2 h-4 w-4 fill-current'
						role='img'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 512 512'
					>
						<path fill='currentColor' d={toast_icons[type]}></path>
					</svg>
					Notification: {type}
				</p>
				<div className='flex items-center'>
					<button
						type='button'
						className='ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none'
						data-te-toast-dismiss
						aria-label='Close'
					>
						<span className='w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='h-6 w-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</span>
					</button>
				</div>
			</div>
			<div
				className={`break-words rounded-b-lg !bg-${toast_types[type]}-100 px-4 py-4 !text-${toast_types[type]}-700`}
			>
				{message}
			</div>
		</div>
	)
}
