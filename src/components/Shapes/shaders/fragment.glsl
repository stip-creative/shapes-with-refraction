uniform sampler2D u_envMap;
uniform vec2 u_resolution;

varying vec3 worldNormal;
varying vec3 eyeVector;

float Fresnel(vec3 eyeVector, vec3 worldNormal) {
	return pow( 1.0 + dot( eyeVector, worldNormal), 3.0 );
}

void main() {
	// get screen coordinates
	vec2 uv = gl_FragCoord.xy / u_resolution;

	vec3 normal = worldNormal;
	// calculate refraction and add to the screen coordinates
	vec3 refracted = refract(eyeVector, normal, 1.0/2.42);
	uv += refracted.xy;
	
	// sample the background texture
	vec4 tex = texture2D(u_envMap, uv);

	// calculate the Fresnel ratio
	float f = Fresnel(eyeVector, normal);

	// mix the refraction color and reflection color
	tex.rgb = mix(tex.rgb, vec3(1.0), f);

	gl_FragColor = vec4(tex.rgb, 1.0);
}