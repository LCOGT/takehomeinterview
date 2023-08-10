'use client'
import { useState, useEffect, useRef, useContext } from 'react'
import { v4 } from 'uuid'
import DatePicker from 'react-datepicker'
import { FormModalProps, FormData as FD, Telescope } from '../interfaces'
import { GlobalState } from '../global-state'

const FormModal: React.FC<FormModalProps> = ({ site, telescopes, close }) => {
	const modalRef = useRef<HTMLDivElement | null>(null)
	const global = useContext(GlobalState)

	const [formData, setFormData] = useState<FD>({
		id: v4(),
		site: site,
		telescope: '',
		start_date: new Date(),
		end_date: null,
		reason: ''
	})

	useEffect(() => {
		const init = async () => {
			const { Input, Ripple, initTE } = await import('tw-elements')
			initTE({ Input, Ripple })
		}
		init()
	}, [])

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				close()
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [close])

	const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setFormData({
				...formData,
				telescope: e.target.value
			})
		}
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

	const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// The FormSubmit function from form-modal.tsx already checks for empty fields
		// the Type error here is a false positive
		const telescope_found = global?.state.downtimes.find(
			(down_tele) => down_tele.telescope === formData.telescope &&
				(new Date(down_tele.start_date) >= new Date(formData.start_date) &&
				new Date(down_tele.start_date) <= new Date(formData.end_date)) ||
			(new Date(down_tele.end_date) >= new Date(formData.start_date) &&
				new Date(down_tele.end_date) <= new Date(formData.end_date))
		)

		// const marked_down =
		// 	telescope_found &&
		// 		(new Date(telescope_found?.start_date) >= new Date(formData.start_date) &&
		// 		new Date(telescope_found?.start_date) <= new Date(formData.end_date)) ||
		// 	(new Date(telescope_found?.end_date) >= new Date(formData.start_date) &&
		// 		new Date(telescope_found?.end_date) <= new Date(formData.end_date))

		// 		console.log(marked_down)

		if (formData.telescope === '') {
			global?.dispatch({
				type: 'TOAST',
				payload: {
					type: 'error',
					message: 'Please select a telescope.'
				}
			})
		} else if (formData.start_date === null || formData.end_date === null) {
			global?.dispatch({
				type: 'TOAST',
				payload: {
					type: 'error',
					message: 'Please select a start and end date.'
				}
			})
		} else if (formData.reason === '') {
			global?.dispatch({
				type: 'TOAST',
				payload: {
					type: 'error',
					message: 'Please enter a reason for downtime.'
				}
			})
		} else if (telescope_found && FormData) {
			global?.dispatch({
				type: 'TOAST',
				payload: {
					type: 'error',
					message:
						'Selected telescope is already in downtime for the specified dates.'
				}
			})
		} else {
			global?.dispatch({
				type: 'CREATE_DOWNTIME',
				payload: {
					...formData,
					start_date: formData.start_date.toUTCString(),
					end_date: formData.end_date.toUTCString()
				}
			})
			close()
		}
	}

	return (
		<div className='fixed inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-slate-700 bg-opacity-30'>
			<div
				className='bg-slate-900 rounded-lg p-6 z-30'
				id='Modal'
				ref={modalRef}
			>
				<form onSubmit={submitForm}>
					<section className='text-lg font-medium'>
						<span className='text-2xl'>Affected Telescopes:</span>
						{telescopes.map((telescope: Telescope) => (
							<div
								className='flex mb-[0.125rem] min-h-[1.5rem] pl-[1.5rem]'
								key={telescope.id}
							>
								<input
									className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-warning checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-warning checked:after:bg-warning checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-warning checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-warning dark:checked:after:border-warning dark:checked:after:bg-warning dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-warning dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
									type='radio'
									id={telescope.id.toString()}
									value={`id:${telescope.id}, ${telescope.name.toLowerCase()}`}
									onChange={(e) => handleRadioChange(e)}
									checked={
										formData.telescope ===
										`id:${telescope.id}, ${telescope.name.toLowerCase()}`
									}
								/>
								<label
									className='inline-block pl-[0.15rem] hover:cursor-pointer'
									htmlFor={telescope.id.toString()}
								>
									{telescope.name}
								</label>
							</div>
						))}
					</section>
					<DatePicker
						selected={formData.start_date}
						minDate={new Date()}
						onChange={(dates: [Date, Date]) => {
							const [start, end] = [dates[0], dates[1]]
							setFormData({
								...formData,
								start_date: start,
								end_date: end
							})
						}}
						startDate={formData.start_date}
						endDate={formData.end_date}
						selectsRange
						inline
					/>
					<span className='text-xl flex justify-center'>
						Reason for downtime:
					</span>
					<textarea
						rows={3}
						cols={5}
						style={{ resize: 'none' }}
						className='w-full p-2 text-lg font-semibold border-2 rounded-md border-amber-500 bg-neutral-800 shadow-lg '
						placeholder='Write the reason for downtime here...'
						value={formData.reason}
						onChange={(e) =>
							e.target.value.length <= 255
								? setFormData({ ...formData, reason: e.target.value })
								: global?.dispatch({
										type: 'TOAST',
										payload: {
											type: 'error',
											message: 'Please adhere to the character limit.'
										}
								  })
						}
					/>
					<span
						className={`${
							formData.reason.length === 255 && 'text-red-500'
						} text-xs flex justify-end`}
					>
						{formData.reason.length}/255 characters limit
					</span>
					<button
						type='submit'
						className='inline-block px-2 mt-4 mr-2 w-32 bg-green-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
						data-te-ripple-init
						data-te-ripple-color='light'
					>
						Submit
					</button>
					<button
						className='inline-block px-2 mt-4 ml-2 w-32 bg-red-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
						data-te-ripple-init
						data-te-ripple-color='light'
						onClick={close}
					>
						Close
					</button>
				</form>
			</div>
		</div>
	)
}

export default FormModal
