tsParticles.load("tsparticles", {
  background: {
    color: "#000"
  },
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  particles: {
    number: {
      value: 0
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
      value: 20,
      random: false
    },
    opacity: {
      value: 1
    },
    move: {
      enable: false
    }
  },
  emitters: [
    {
      direction: "none",
      life: {
        count: 1,
        duration: 0.1
      },
      rate: {
        quantity: 200,
        delay: 0.1
      },
      position: {
        x: 50,
        y: 50
      }
    }
  ]
});
