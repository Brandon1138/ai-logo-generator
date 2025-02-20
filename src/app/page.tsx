// src/app/page.tsx

import LogoCanvas from '../components/LogoCanvas';

export default function Home() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
			<LogoCanvas />
		</main>
	);
}
