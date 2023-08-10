export interface Downtime {
	id: string
	site: string
	telescope: string
	start_date: Date
	end_date: Date
	reason: string
}

export interface AppState {
	downtimes: Downtime[]
	toast: {
		message: string
		type: string
	}
}

export interface AppAction {
	type: string
	payload: any
}

interface Location {
	latitude: number
	longitude: number
}

export interface Telescope {
	id: number
	name: string
}

export interface Observatory {
	id: number
	name: string
	description: string
	image: string
	location: Location
	elevation: number
	code: string
	timezone: string
	telescopes: Telescope[]
}

export interface FormModalProps {
	site: string
	telescopes: Telescope[]
	close: () => void
}

export interface FormData {
	id: string
	site: string
	telescope: string
	start_date: Date | null
	end_date: Date | null
	reason: string
}
