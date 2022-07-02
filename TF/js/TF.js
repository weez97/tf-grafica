"use strict";

//AUTORES
//DIEGO PEREIRA - U201723546
//LUIS PINEDA - U201915747

import * as cg from "./cg.js";
import * as m4 from "./glmjs/mat4.js";
import * as v3 from "./glmjs/vec3.js";
import * as twgl from "./twgl-full.module.js";

async function main() {
	const gl = document.querySelector("#canvitas").getContext("webgl2");
	if (!gl) return undefined !== console.log("WebGL 2.0 not supported");

	twgl.setDefaults({ attribPrefix: "a_" });

	let vertSrc = await fetch("glsl/13-01.vert").then((r) => r.text());
	let fragSrc = await fetch("glsl/13-01.frag").then((r) => r.text());
	const planetProgramInfo = twgl.createProgramInfo(gl, [vertSrc, fragSrc]);
	const planet = await cg.loadObj(
		"models/enderman/enderman.obj",
		gl,
		planetProgramInfo,
		);
		
		
		const seed = Math.random()*10000;
		perlin.seed();
		
		vertSrc = await fetch("glsl/13-02.vert").then((r) => r.text());
		fragSrc = await fetch("glsl/13-02.frag").then((r) => r.text());
		const rockProgramInfo = twgl.createProgramInfo(gl, [vertSrc, fragSrc]);
	
		//const requestObj = (type) => {
		//	//console.log("requested:"+type);
		//	if (type <= -5) return 0;
		//	else if (type > -5 && type < 0) return 1;
		//	else if (type >= 0 && type < 3) return 2;
		//	else return 3; 
		//  }

	const matrixSize = 500;
	const numInstances = Math.pow(matrixSize, 2);
	const transforms = new Float32Array(numInstances * 16);
	const infoInstances = new Array(numInstances);
	
	const grass = await cg.loadObj(
		"models/grass/grass.obj",
		gl,
		rockProgramInfo,
		transforms,
		);
		
		const rock = await cg.loadObj(
		"models/planet/planet.obj",
		gl,
		rockProgramInfo,
		transforms,
		);
		
		const sand = await cg.loadObj(
		"models/sand/sand.obj",
		gl,
		rockProgramInfo,
		transforms,
		);
		const water = await cg.loadObj(
		"models/water/water.obj",
		gl,
		rockProgramInfo,
		transforms,
		);
		const dirt = await cg.loadObj(
		"models/dirt/dirt.obj",
		gl,
		rockProgramInfo,
		transforms,
		);
		
		let cubex = await cg.loadObj(
		"models/enderman/enderman.obj",
		gl,
		rockProgramInfo,
		transforms,
		);
			
		//instance a different obj depending on the perlin noise value (???) 知らない
		for (let i = 0; i < matrixSize; i++) 
		{
			for(let j = 0; j < matrixSize; j++)
			{
				let ind = (matrixSize*i)+j;
				let perlin_value = perlin.get(i/matrixSize, j/matrixSize); 
				
				infoInstances[ind] = 
				{
					transform: transforms.subarray(ind * 16, ind * 16 + 16),
				}
				m4.identity(infoInstances[ind].transform);
				
				m4.translate(
					infoInstances[ind].transform,
					infoInstances[ind].transform,
					[i*2-(matrixSize/2), perlin_value.toFixed(2)*200, j*2-(matrixSize/2)],
			);
		}
	}


	const cam = new cg.Cam([0, 5, 0], 25);
	const rotationAxis = new Float32Array([1, 0.66, 0.33]);
	const asteroidRotAxis = new Float32Array([0, 1.0, 0]);

	let aspect = 1;
	let deltaTime = 0;
	let lastTime = 0;
	let theta = 0;

	const uniforms = {
		u_world: m4.create(),
		u_projection: m4.create(),
		u_view: cam.viewM4,
	};

	const fragUniforms = {
		u_ambientLight: new Float32Array([0.1, 0.1, 0.1]),
		u_lightPosition: new Float32Array([0.0, 0.0, 0.0]),
		u_viewPosition: cam.pos,
	};
	const lightRotAxis = new Float32Array([0.0, 0.0, 0.0]);
	const lightRotSource = new Float32Array([15.0, 1.5, 5.0]);

	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);

	function render(elapsedTime) {
		elapsedTime *= 1e-3;
		deltaTime = elapsedTime - lastTime;
		lastTime = elapsedTime;

		if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
			gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
			aspect = gl.canvas.width / gl.canvas.height;
		}
		gl.clearColor(0.1, 0.1, 0.1, 1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		m4.identity(uniforms.u_projection);
		m4.perspective(uniforms.u_projection, cam.zoom, aspect, 0.1, 100);

		theta = elapsedTime * Math.PI / 8.0;

		v3.rotateY(
			fragUniforms.u_lightPosition,
			lightRotSource,
			lightRotAxis,
			theta,
		);

		m4.identity(uniforms.u_world);
		m4.translate(uniforms.u_world, uniforms.u_world, [0,0,0]);
		m4.rotate(uniforms.u_world, uniforms.u_world, theta, rotationAxis);

		gl.useProgram(planetProgramInfo.program);
		twgl.setUniforms(planetProgramInfo, uniforms);
		twgl.setUniforms(planetProgramInfo, fragUniforms);
		for (const { bufferInfo, vao, material } of planet) {
			gl.bindVertexArray(vao);
			twgl.setUniforms(planetProgramInfo, {}, material);
			twgl.drawBufferInfo(gl, bufferInfo);
		}

		gl.useProgram(rockProgramInfo.program);
		m4.identity(uniforms.u_world);

		twgl.setUniforms(rockProgramInfo, uniforms);
		twgl.setUniforms(rockProgramInfo, fragUniforms);
		for (const { bufferInfo, vertexArrayInfo, vao, material } of grass) {
			//gl.material=requestObj(transforms)
			gl.bindVertexArray(vao);
			gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.a_transform.buffer);
			gl.bufferSubData(gl.ARRAY_BUFFER, 0, transforms);
			twgl.setUniforms(rockProgramInfo, {}, material);
			twgl.drawBufferInfo(
				gl,
				vertexArrayInfo,
				gl.TRIANGLES,
				vertexArrayInfo.numElements,
				0,
				numInstances,
			);
		}
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);

	document.addEventListener("keydown", (e) => {
		/**/ if (e.key === "w") cam.processKeyboard(cg.FORWARD, deltaTime);
		else if (e.key === "a") cam.processKeyboard(cg.LEFT, deltaTime);
		else if (e.key === "s") cam.processKeyboard(cg.BACKWARD, deltaTime);
		else if (e.key === "d") cam.processKeyboard(cg.RIGHT, deltaTime);
	});
	document.addEventListener("mousemove", (e) => cam.movePov(e.x, e.y));
	document.addEventListener("mousedown", (e) => cam.startMove(e.x, e.y));
	document.addEventListener("mouseup", () => cam.stopMove());
	document.addEventListener("wheel", (e) => cam.processScroll(e.deltaY));
}

main();
