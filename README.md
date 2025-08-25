# Photography Website (React + WebGL)

This is a modern **photography portfolio website** built with **React** and enhanced with a **custom WebGL shader background**.  
The WebGL background uses domain-warped FBM noise to create a smooth, smokey motion effect that adds a premium, cinematic atmosphere to the site.

---

## 🚀 Features
- ⚡ Built with **React** for a fast and dynamic front-end.
- 🎨 **WebGL shader background** (generated with GPT-5) for a unique, animated smokey effect.
- 📱 Responsive design that adapts to different screen sizes.
- 🖼️ Elegant sections for showcasing photography work.
- 🧩 Modular components (`Navbar`, `Body`, `Hero`) for clean code structure.

---

## 🖥️ Tech Stack
- **React.js** – Component-based UI framework
- **WebGL / GLSL** – GPU-based rendering for shader animations
- **Tailwind CSS** – Utility-first CSS framework for styling
- **ResizeObserver API** – Handles canvas scaling and responsiveness

---

## 🔮 WebGL Shader
The **shader code** (`vert` + `frag`) creates a **smokey animated background** using:
- **FBM Noise** (Fractal Brownian Motion)
- **Domain Warping** for fluid motion
- **Customizable uniforms**:
  - `u_scale` → Smoke density
  - `u_speed` → Flow speed
  - `u_contrast` → Contrast/sharpness
  - `u_color1 / u_color2` → Gradient colors



---

## Installation & Setup
# Install dependencies
npm install

# Start development server
npm run dev


### The **WebGL shader was generated using GPT-5**, then integrated and fine-tuned for real-time rendering.