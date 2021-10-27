import React, { FunctionComponent, useMemo, useRef } from "react";
import { Icosahedron, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Plane from "../Plane";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const Shapes: FunctionComponent = () => {
    const material = useRef<any>();
    const icosahedron = useRef<any>();
    const camera = useRef<any>();

    const vp = {
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: Math.min(devicePixelRatio, 2 || 1)
    };

    const [scene, target] = useMemo(() => {
        const scene = new THREE.Scene();
        const target = new THREE.WebGLRenderTarget(vp.width, vp.height);
        return [scene, target];
    }, []);

    const uniforms = useMemo(
        () => ({
            u_time: { type: "float", value: 0 },
            u_resolution: { type: "vec2", value: [window.innerWidth, window.innerHeight] },
            u_envMap: { type: "sampler2D", value: target.texture }
        }),
        []
    );

    useFrame(({ clock, gl }) => {
        const materialRef = material?.current;
        const cameraRef = camera?.current;
        const icosahedronRef = icosahedron?.current;

        // add timer in shader
        if (icosahedronRef) {
            icosahedronRef.rotation.y += 0.009;
        }

        // add timer in shader
        if (materialRef) {
            materialRef.uniforms.u_time.value = clock.getElapsedTime();
        }

        // add render target to scene
        if (cameraRef) {
            gl.setRenderTarget(target);
            gl.render(scene, cameraRef);
            gl.setRenderTarget(null);
        }
    });

    return (
        <>
            <OrthographicCamera ref={camera} position={[0, 0, 5]} />
            {createPortal(<Plane />, scene)}
            <Icosahedron ref={icosahedron} args={[2, 1]} position={[0, 0, 0]}>
                <shaderMaterial ref={material} attach="material" vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
                {/* <meshStandardMaterial attach="material" map={target.texture} /> */}
            </Icosahedron>
        </>
    );
};

export default Shapes;
