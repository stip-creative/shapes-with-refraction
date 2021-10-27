import React, { FunctionComponent, Suspense, useMemo, useRef } from "react";
import { Plane, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const PlaneComponent: FunctionComponent = () => {
    const material = useRef<any>();

    const uniforms = useMemo(
        () => ({
            u_time: { type: "float", value: 0 },
            u_resolution: { type: "vec2", value: [window.innerWidth, window.innerHeight] }
        }),
        []
    );

    // useFrame(({ clock }) => {
    //     const materialRef = material?.current;

    //     // add timer in shader
    //     if (materialRef) {
    //         materialRef.uniforms.u_time.value = clock.getElapsedTime();
    //     }
    // });

    const texture = useTexture(
        "https://images.unsplash.com/photo-1559717642-b96cbea7bf56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
    );

    return (
        <Plane args={[1, 1]} scale={[window.innerWidth, window.innerHeight, 1]} position={[0, 0, -20]}>
            {/* <shaderMaterial ref={material} attach="material" vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} /> */}
            <meshBasicMaterial ref={material} attach="material" map={texture} />
        </Plane>
    );
};

export default PlaneComponent;
