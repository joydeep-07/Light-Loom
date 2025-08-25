import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Body from "./Body";


const vert = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Fragment shader: domain-warped fbm noise for smokey motion
const frag = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_scale;       // density of smoke (noise scale)
uniform float u_speed;       // flow speed
uniform float u_contrast;    // contrast/curve
uniform vec3 u_color1;      // dark green
uniform vec3 u_color2;      // bright green

// ---- utility noise (iq-style) ----
float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float n = mix(
    mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
    mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x),
    u.y
  );
  return n;
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i=0;i<6;i++){
    v += a * noise(p);
    p = mat2(1.6,1.2,-1.2,1.6) * p; // rotate/scale between octaves
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // keep aspect ratio in noise domain
  vec2 p = (gl_FragCoord.xy - 0.5*u_resolution.xy) / u_resolution.y; // -ish to +ish

  // time-evolving domain warp
  float t = u_time * u_speed;
  vec2 q = p * u_scale;
  vec2 warp = vec2(
    fbm(q + vec2(0.0, t*0.7)),
    fbm(q + vec2(5.2, -t*0.4))
  );
  vec2 r = q + 1.25*warp + vec2(t*0.08, -t*0.12);

  float m = fbm(r);

  // shape + vignette to feel like glowing ink
  float vignette = smoothstep(1.2, 0.2, length(p));
  float glow = pow(m, u_contrast) * vignette;

  vec3 col = mix(u_color1, u_color2, glow);

  // subtle bloom-ish lift
  col += 0.07 * vec3(glow*glow);

  // final output
  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("Shader compile failed: " + info);
  }
  return shader;
}

function createProgram(gl, vsrc, fsrc) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsrc);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsrc);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error("Program link failed: " + info);
  }
  return prog;
}

function hexToRgbVec3(hex) {
  if (!hex) return [0, 1, 0.6];
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const num = parseInt(h, 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  return [r, g, b];
}

const Hero = ({
  speed = 0.15, // smoke flow speed
  density = 2.5, // higher = tighter detail
  contrast = 1.5, // 1.0–2.0 looks good
  color1 = "#dad7cd", // base dark green
  color2 = "#353535", // light, bright green
  className = "min-h-[100vh]",
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      console.warn(
        "WebGL not supported — falling back to CSS gradient background."
      );
      return;
    }

    const program = createProgram(gl, vert, frag);
    gl.useProgram(program);

    // full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // uniforms
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uScale = gl.getUniformLocation(program, "u_scale");
    const uSpeed = gl.getUniformLocation(program, "u_speed");
    const uContrast = gl.getUniformLocation(program, "u_contrast");
    const uColor1 = gl.getUniformLocation(program, "u_color1");
    const uColor2 = gl.getUniformLocation(program, "u_color2");

    const col1 = hexToRgbVec3(color1);
    const col2 = hexToRgbVec3(color2);
    gl.uniform3fv(uColor1, new Float32Array(col1));
    gl.uniform3fv(uColor2, new Float32Array(col2));
    gl.uniform1f(uScale, density);
    gl.uniform1f(uSpeed, speed);
    gl.uniform1f(uContrast, contrast);

    let start = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      const w = Math.max(1, Math.floor(clientWidth * dpr));
      const h = Math.max(1, Math.floor(clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const render = () => {
      const now = performance.now();
      const t = (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [speed, density, contrast, color1, color2]);

  return (
    <section
      className={`relative w-full ${className} overflow-hidden grayscale-100 bg-black`}
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        aria-hidden
      />
      <div className="relative z-10 h-full">
        <Navbar />
        <Body />
      
      </div>
    </section>
  );
};

export default Hero;
