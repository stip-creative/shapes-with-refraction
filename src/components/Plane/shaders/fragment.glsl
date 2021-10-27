uniform float u_time;
uniform vec2 u_resolution;

void main( void ) {
    vec2 position = - 1.0 + 2.0 * gl_FragCoord.xy / u_resolution.xy;
    float red = abs( sin( position.x * position.y + u_time / 5.0 ) );
    float green = abs( sin( position.x * position.y + u_time / 4.0 ) );
    float blue = abs( sin( position.x * position.y + u_time / 3.0 ) );
    gl_FragColor = vec4( red, green, blue, 1.0 );
}