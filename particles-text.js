tsParticles.load("tsparticles", {
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    background: {
      color: "#000"
    },
    particles: {
      number: {
        value: 0 // Use emitter instead
      },
      color: {
        value: ["#0892d0", "#f6f930"]
      },
      shape: {
        type: "char",
        character: {
          value: "Hello!",
          font: "Verdana",
          style: "",
          weight: "400",
          fill: true
        }
      },
      size: {
        value: 16,
        random: false
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: {
          default: "destroy"
        }
      },
      opacity: {
        value: 1
      }
    },
    emitters: {
      position: {
        x: 50,
        y: 50
      },
      rate: {
        quantity: 1,
        delay: 0.1
      },
      size: {
        width: 0,
        height: 0
      }
    }
  });
  