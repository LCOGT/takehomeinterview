'use client'
import { useState, useContext } from 'react'
import { GlobalState } from '../global-state'
import { Downtime } from '../interfaces'
export default function DowntimesTable() {
	const global = useContext(GlobalState)

	const [reason, setReason] = useState('')

	const expandReason = (id: string, reason_selected: string) => {
		setReason(reason_selected)
		const reason = document.getElementById(id)
		const reason_charlimit = document.getElementById(`${id}-charlimit`)
		const reason_submit_btn = document.getElementById(`${id}-submit`)
		reason?.classList.toggle('hidden')
		reason_charlimit?.classList.toggle('hidden')
		reason_submit_btn?.classList.toggle('hidden')
	}

	const submitReason = (downtime: Downtime, reason: string) => {
		const reason_textarea = document.getElementById(downtime.id)
		const reason_charlimit = document.getElementById(`${downtime.id}-charlimit`)
		const reason_submit_btn = document.getElementById(`${downtime.id}-submit`)
		reason_textarea?.classList.toggle('hidden')
		reason_charlimit?.classList.toggle('hidden')
		reason_submit_btn?.classList.toggle('hidden')
		global?.dispatch({
			type: 'UPDATE_DOWNTIME',
			payload: {
				...downtime,
				reason: reason
			}
		})
	}

	const handleDelete = (downtime: Downtime) => {
		global?.dispatch({
			type: 'DELETE_DOWNTIME',
			payload: downtime
		})
	}

	return (
		<table className='min-w-full text-center text-sm font-light'>
			<thead className='border-b bg-amber-500 text-white font-medium dark:border-neutral-500'>
				<tr>
					<th scope='col' className='cursor-pointer py-4'>
						Downtime ID
					</th>
					<th scope='col'>Site</th>
					<th scope='col'>Telescope</th>
					<th scope='col'>Start</th>
					<th scope='col'>End</th>
					<th scope='col'>Reason</th>
					<th scope='col'>Delete</th>
				</tr>
			</thead>
			<tbody>
				{global?.state.downtimes.map((downtime: Downtime) => (
					<tr key={downtime.id} className='border-b dark:border-neutral-500'>
						<td className='py-4'>{downtime.id}</td>
						<td>{downtime.site}</td>
						<td>{downtime.telescope}</td>
						{/* @ts-ignore */}
						<td>{downtime.start_date}</td>
						{/* @ts-ignore */}
						<td>{downtime.end_date}</td>
						<td>
							<textarea
								id={downtime.id}
								rows={3}
								cols={5}
								style={{ resize: 'none' }}
								className='w-full hidden p-2 text-lg font-semibold border-2 rounded-md border-amber-500 bg-neutral-800 shadow-lg '
								placeholder='Write the reason for downtime here...'
								value={reason}
								onChange={(e) =>
									e.target.value.length <= 255
										? setReason(e.target.value)
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
								id={`${downtime.id}-charlimit`}
								className={`${
									reason.length === 255 && 'text-red-500'
								} hidden text-xs justify-end`}
							>
								{reason.length}/255 characters limit
							</span>
							<button
								id={`${downtime.id}-submit`}
								className='bg-green-700 hidden px-1 py-1 rounded-lg text-xs text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
								data-te-ripple-init
								data-te-ripple-color='light'
								onClick={() => {
									submitReason(downtime, reason)
								}}
							>
								Submit
							</button>
							<button
								className='bg-sky-700 px-1 py-1 rounded-lg text-xs text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
								data-te-ripple-init
								data-te-ripple-color='light'
								onClick={() => {
									expandReason(downtime.id, downtime.reason)
								}}
							>
								View/Edit Reason
							</button>
						</td>
						<td>
							<svg
								onClick={() => handleDelete(downtime)}
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
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
