'use client'
import { useEffect, createContext, useReducer } from 'react'
import { AppState, AppAction } from './interfaces'
import Toaster from './components/toast'

const GlobalState = createContext<{
	state: AppState
	dispatch: React.Dispatch<AppAction>
} | null>(null)

const DispatchProvider = ({ children }: { children?: React.ReactNode }) => {
	const reducer = (state: AppState, action: AppAction) => {
		switch (action.type) {
			case 'CREATE_DOWNTIME':
				return {
					...state,
					downtimes: [...state.downtimes, action.payload],
					toast: {
						message: 'Downtime record created',
						type: 'success'
					}
				}
			case 'UPDATE_DOWNTIME':
				const updatedDowntimes = state.downtimes.map((down) => {
					if (down.id === action.payload.id) {
						return {
							...down,
							reason: action.payload.reason
						}
					}
					return down
				})

				return {
					...state,
					downtimes: updatedDowntimes,
					toast: {
						message: 'Downtime record updated',
						type: 'success'
					}
				}
			case 'DELETE_DOWNTIME':
				const filtered = state.downtimes.filter(
					(down) => down.id !== action.payload.id
				)

				return {
					...state,
					downtimes: filtered,
					toast: {
						message: 'Downtime record deleted',
						type: 'success'
					}
				}
			case 'TOAST':
				return {
					...state,
					toast: {
						message: action.payload.message,
						type: action.payload.type
					}
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		downtimes: [],
		toast: {
			message: '',
			type: ''
		}
	})

	useEffect(() => {
		const disappearance = setTimeout(() => {
			dispatch({ type: 'TOAST', payload: { message: '', type: '' } })
		}, 5000)
		return () => {
			clearTimeout(disappearance)
		}
	}, [state.toast.message])

	return (
		<GlobalState.Provider value={{ state, dispatch }}>
			{state.toast.message && (
				<Toaster message={state.toast.message} type={state.toast.type} />
			)}
			{children}
		</GlobalState.Provider>
	)
}

export { GlobalState, DispatchProvider }
