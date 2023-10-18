import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { Suspense } from "react";

export default function App() {
	return (
		<Canvas camera={{ position: [8, 8, 8], fov: 30 }}>
			<Suspense>
				<Experience />
			</Suspense>
		</Canvas>
	);
}