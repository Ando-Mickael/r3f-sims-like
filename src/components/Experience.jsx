import { Environment, OrbitControls, Sky } from '@react-three/drei';
import { Ando } from './Ando';
import { useState } from 'react';
import { Vector3 } from 'three';

export default function Experience() {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        z: 0
    });

    return (
        <>
            <OrbitControls />
            <Environment preset='sunset' />
            <Sky />
            <Ando position={new Vector3(position.x, position.y, position.z)} />
            <mesh
                rotation-x={-Math.PI / 2}
                scale={10}
                onClick={(e) => {
                    setPosition({
                        x: e.point.x,
                        z: e.point.z
                    });
                }}
            >
                <planeGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
        </>
    );
}