import DisplayObservatories from "./components/display_observatories"

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <DisplayObservatories />
    </main>
	)
}
