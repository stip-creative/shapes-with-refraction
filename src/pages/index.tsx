import React, { FunctionComponent, Suspense, useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Plane from "../components/Plane";
import Shapes from "../components/Shapes";

import { GlobalStyles } from "../styles/globalStyles";
import { StyledCanvasWrapper } from "./style";

extend({ OrbitControls });

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: { domElement }
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame(state => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]} />;
};

const IndexPage: FunctionComponent = () => {
    return (
        <StyledCanvasWrapper>
            <GlobalStyles />
            <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 5], aspect: window.innerWidth / window.innerHeight }}>
                <CameraControls />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    <Shapes />
                    <Plane />
                </Suspense>
            </Canvas>
        </StyledCanvasWrapper>
    );
};

export default IndexPage;
