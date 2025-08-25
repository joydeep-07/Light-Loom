import React, { useEffect, useRef } from "react";

const InkCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Vertex shader
    const vert = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader — ink/smokey trail
    const frag = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_mouse;
      uniform float u_time;

      float circle(vec2 uv, vec2 pos, float radius) {
        return smoothstep(radius, radius - 0.01, distance(uv, pos));
      }

      void main() {
        vec2 uv = v_uv;
        
        // Ink blob around mouse
        float ink = circle(uv, u_mouse, 0.1 + 0.05 * sin(u_time));

        // Add noise-like variation
        float r = sin(uv.x * 40.0 + u_time) * 0.02;
        float g = cos(uv.y * 40.0 - u_time) * 0.02;

        vec3 color = vec3(0.0, 0.0, 0.0); // black ink
        color += ink * vec3(0.1 + r, 0.1 + g, 0.15);

        gl_FragColor = vec4(color, ink * 0.9);
      }
    `;

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const a_position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

    const u_mouse = gl.getUniformLocation(program, "u_mouse");
    const u_time = gl.getUniformLocation(program, "u_time");

    let mouse = [0.5, 0.5];
    window.addEventListener("mousemove", (e) => {
      mouse = [
        e.clientX / window.innerWidth,
        1.0 - e.clientY / window.innerHeight,
      ];
    });

    let start = Date.now();
    const render = () => {
      const t = (Date.now() - start) / 1000.0;
      gl.uniform1f(u_time, t);
      gl.uniform2fv(u_mouse, mouse);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default InkCursor;
