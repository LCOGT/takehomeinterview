'use client'
import { useContext } from 'react'
import observatories from '../data/observatories.json'
import ObservatoryCard from './observatory_card'
import { GlobalState } from '../global-state'

export default function DisplayObservatories() {
	const global = useContext(GlobalState)

	const handleClick = () => {
		global?.dispatch({ type: 'CREATE_DOWNTIME', payload: true })
	}

	console.log(global?.state.downtimes)

	return (
		<section className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center'>
			{observatories.map((site) => (
				<ObservatoryCard key={site.id} {...site} />
			))}
			<button onClick={handleClick}>Switch global state</button>
		</section>
	)
}
