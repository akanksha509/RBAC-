const AnimatedBackground = () => {
  const styles = `
    .animated-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: #0a0a1f;
      overflow: hidden;
      z-index: 0;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      opacity: 0.8;
      mix-blend-mode: screen;
    }

    @keyframes morph {
      0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      }
      50% {
        transform: translate(var(--translate-x), var(--translate-y)) rotate(180deg) scale(0.9);
        border-radius: 70% 30% 40% 60% / 50% 40% 60% 50%;
      }
      100% {
        transform: translate(0, 0) rotate(360deg) scale(1);
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      }
    }

    @keyframes colorPulse {
      0% {
        background: linear-gradient(45deg, rgba(66, 99, 235, 0.2), rgba(148, 82, 236, 0.2));
      }
      50% {
        background: linear-gradient(45deg, rgba(82, 236, 148, 0.2), rgba(66, 99, 235, 0.2));
      }
      100% {
        background: linear-gradient(45deg, rgba(66, 99, 235, 0.2), rgba(148, 82, 236, 0.2));
      }
    }
  `;

  const shapes = Array.from({ length: 6 }).map((_, i) => ({
    style: {
      width: `${Math.random() * 30 + 40}vw`,
      height: `${Math.random() * 30 + 40}vw`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      "--translate-x": `${Math.random() * 40 - 20}%`,
      "--translate-y": `${Math.random() * 40 - 20}%`,
      animation: `
        morph ${20 + i * 5}s ease-in-out infinite,
        colorPulse ${15 + i * 3}s ease-in-out infinite
      `,
      animationDelay: `-${Math.random() * 20}s`,
    },
  }));

  return (
    <>
      <style>{styles}</style>
      <div className="animated-bg">
        {shapes.map((shape, index) => (
          <div key={index} className="shape" style={shape.style} />
        ))}
      </div>
    </>
  );
};

export default AnimatedBackground;
