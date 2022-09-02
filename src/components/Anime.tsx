import React, {useEffect, useRef} from 'react';
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import space from "../assets/space.jpg"

const Anime = () => {
	const myRef = useRef(null);

	useEffect(() => {
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
		camera.position.setZ(40)

		const renderer = new THREE.WebGLRenderer({
			canvas: myRef.current || undefined
		})

		renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setSize(window.innerWidth, window.innerHeight)


		const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
		const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true})
		const torus = new THREE.Mesh(geometry, material)
		scene.add(torus)

		const pointLight = new THREE.PointLight(0xfffff)
		pointLight.position.set(5, 5, 5)
		const ambientLight = new THREE.AmbientLight(0xfffff)
		scene.add(pointLight, ambientLight)

		const lightHelper = new THREE.PointLightHelper(pointLight)
		const gridHelper = new THREE.GridHelper(200, 50)
		scene.add(lightHelper, gridHelper)

		const controls = new OrbitControls(camera, renderer.domElement)

		function addStar() {
			const geo = new THREE.SphereGeometry(0.25, 24, 24)
			const mat = new THREE.MeshStandardMaterial({color: 0xfffff})
			const star = new THREE.Mesh(geo, mat)

			const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

			star.position.set(x, y, z)
			scene.add(star)
		}

		Array(100).fill().forEach(addStar)

		scene.background = new THREE.TextureLoader().load(space.src);

		const normal = new THREE.TextureLoader().load(space.src);
		const moonTexture = new THREE.TextureLoader().load(space.src);

		const moon = new THREE.Mesh(
			new THREE.SphereGeometry(3, 32, 32),
			new THREE.MeshStandardMaterial({
				map: moonTexture,
				normalMap: normal,
			})
		);

		scene.add(moon);

		moon.position.z = 30;
		moon.position.setX(-10);


		function animate() {
			requestAnimationFrame(animate)

			torus.rotation.x += 0.01
			torus.rotation.y += 0.005
			torus.rotation.z += 0.01

			controls.update()

			renderer.render(scene, camera)
		}

		animate()
	}, [])


	return (
		<div>
			Here we have canvas
			<canvas ref={myRef}/>
		</div>
	)

}

export default Anime;