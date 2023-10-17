import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

export function Ando(props) {
    const MOVEMENT_SPEED = 0.032;
    const position = useMemo(() => props.position, []);

    const group = useRef();
    const { nodes, materials } = useGLTF("models/ando.glb");
    const { animations: idleAnimation } = useFBX("animations/neutral_idle.fbx");
    const { animations: walkingAnimation } = useFBX("animations/Walking.fbx");

    idleAnimation[0].name = "Idle";
    walkingAnimation[0].name = "Walking";

    const { actions } = useAnimations([idleAnimation[0], walkingAnimation[0]], group);

    const [animation, setAnimation] = useState("Idle");

    useEffect(() => {
        console.log(props.position);
        actions[animation].reset().play();
    }, [animation]);

    useFrame(() => {
        if (group.current.position.distanceTo(props.position) > 0.1) {
            const direction = group.current.position
                .clone()
                .sub(props.position)
                .normalize()
                .multiplyScalar(MOVEMENT_SPEED);
            group.current.position.sub(direction);
            group.current.lookAt(props.position);
            setAnimation("Walking");
        } else {
            setAnimation("Idle");
        }
    });

    return (
        <group {...props} position={position} ref={group} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <primitive object={nodes.Hips} />
                <skinnedMesh
                    name="EyeLeft"
                    geometry={nodes.EyeLeft.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeLeft.skeleton}
                    morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
                />
                <skinnedMesh
                    name="EyeRight"
                    geometry={nodes.EyeRight.geometry}
                    material={materials.Wolf3D_Eye}
                    skeleton={nodes.EyeRight.skeleton}
                    morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                    morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
                />
                <skinnedMesh
                    name="Wolf3D_Head"
                    geometry={nodes.Wolf3D_Head.geometry}
                    material={materials.Wolf3D_Skin}
                    skeleton={nodes.Wolf3D_Head.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
                />
                <skinnedMesh
                    name="Wolf3D_Teeth"
                    geometry={nodes.Wolf3D_Teeth.geometry}
                    material={materials.Wolf3D_Teeth}
                    skeleton={nodes.Wolf3D_Teeth.skeleton}
                    morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                    morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Body.geometry}
                    material={materials.Wolf3D_Body}
                    skeleton={nodes.Wolf3D_Body.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                    material={materials.Wolf3D_Outfit_Bottom}
                    skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                    material={materials.Wolf3D_Outfit_Footwear}
                    skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Outfit_Top.geometry}
                    material={materials.Wolf3D_Outfit_Top}
                    skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.Wolf3D_Hair.geometry}
                    material={materials.Wolf3D_Hair}
                    skeleton={nodes.Wolf3D_Hair.skeleton}
                />
            </group>
        </group>

    );
}

useGLTF.preload("models/ando.glb");