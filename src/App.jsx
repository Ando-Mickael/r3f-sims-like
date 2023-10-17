import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

const App = () => {
	return (
		<Canvas camera={{ position: [8, 8, 8], fov: 30 }}>
			<Experience />
		</Canvas>
	);
}

export default App;