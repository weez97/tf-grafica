#version 300 es

precision highp float;

out vec4 color;

uniform vec3 u_lightColor;

void main() {
	color = vec4(u_lightColor, 1.0);
}
