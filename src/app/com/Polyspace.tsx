'use client'

import React, { useEffect } from 'react';
import * as THREE from 'three';

const Polyspace = () => {
    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000);
        scene.fog = new THREE.Fog(0xffffff, 1, 1000);
        const camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.01, 10000);
        const zoom = camera.position.z = 350;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('polyspace')!.appendChild(renderer.domElement);

        const geometry = new THREE.TetrahedronGeometry(1000);
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            flatShading: true,
            transparent: true,
            opacity: 0.1,
            shininess: 20,
            polygonOffset: true,
            polygonOffsetFactor: 300,
            polygonOffsetUnits: 1,
            side: THREE.BackSide
        });

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.5
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.add(new THREE.LineSegments(
            new THREE.EdgesGeometry(geometry),
            lineMaterial)
        );

        const meshRotator = new THREE.Group();
        
        meshRotator.add(mesh);
        scene.add(meshRotator);


        //movement
        let mouseX = 0, mouseY = 0, scroll = 0;
        let targetMouseX = 0, targetMouseY = 0, targetScroll = 0;

        window.onscroll = () => targetScroll = window.scrollY;

        const onMouseMove = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
            targetMouseX = clientX - window.innerWidth / 2;
            targetMouseY = clientY - window.innerHeight / 2;

            const zoomer = 0.1;
            camera.position.z = zoom - Math.abs(window.innerWidth / 2 - clientX) * zoomer;
        };

        document.addEventListener('mousemove', onMouseMove);

        const update = () => {
            const easeFactor = 0.01;
            const ease = (target: number, current: number) => current + (target - current) * easeFactor;
            mouseX = ease(targetMouseX, mouseX);
            mouseY = ease(targetMouseY, mouseY);
            scroll = ease(targetScroll, scroll);

            const mouseQuaternion = new THREE.Quaternion()
                .multiplyQuaternions(
                    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), mouseX * 0.0006),
                    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), mouseY * 0.0003)
                );
            const scrollQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), scroll * 0.001);
            meshRotator.quaternion.multiplyQuaternions(mouseQuaternion, scrollQuaternion);

            mesh.rotation.x += 0.0003;

            //camera.position.x = ease(mouseX, camera.position.x) * 1;
            //camera.position.y = ease(-mouseY, camera.position.y) * 1;
        };

        const animate = () => {
            requestAnimationFrame(animate);
            update();
            renderer.render(scene, camera);
        };

        animate();

        window.addEventListener('resize', () => {
            const { innerWidth, innerHeight } = window;
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(innerWidth, innerHeight);
        });

        return () => {
            //Cleanup
            document.removeEventListener('mousemove', onMouseMove);
            window.onscroll = null;
        };
    }, []);

    return <div id="polyspace" />;
};

export default Polyspace;