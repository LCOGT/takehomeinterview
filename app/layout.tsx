import './globals.css'
import type { Metadata } from 'next'
import { Padauk } from 'next/font/google'
import 'tw-elements/dist/css/tw-elements.min.css'
import Header from './components/header'
import Footer from './components/footer'
import { DispatchProvider } from './global-state'
const padauk = Padauk({
	weight: ['400'],
	display: 'swap',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Las Cumbres Observatory',
	description: 'Telescope Maintenance Time Windows'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={`${padauk.className} bg-slate-900 text-amber-500`}>
				<DispatchProvider>
					<Header />
					{children}
					<Footer />
				</DispatchProvider>
			</body>
		</html>
	)
}
