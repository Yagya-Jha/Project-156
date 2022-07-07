//Diver rotation component
AFRAME.registerComponent("diver-rotation-reader", {
  schema: {
    speedOfRoation: { type: "number", default: 0 },
    speedOfMovement: { type: "number", default: 0 }
  },
  init: function () {
    window.addEventListener("keydown", (e) => {

      //get the data from the attributes
      this.data.speedOfRoation = this.el.getAttribute("rotation");      
      this.data.speedOfMovement = this.el.getAttribute("position");

      var diverRotation = this.data.speedOfRoation;      
      var diverPosition = this.data.speedOfMovement;

      //control the attributes with the Arrow Keys
      if (e.key === "ArrowDown") {
          diverPosition.z += 0.1;
          this.el.setAttribute("position", diverPosition);
      }
      if (e.key === "ArrowUp") {
          diverPosition.z -= 0.1;
          this.el.setAttribute("position", diverPosition);
      }
      if (e.key === "ArrowRight") {
        if (diverRotation.y > -360) {
          diverRotation.y -= 0.5;
          this.el.setAttribute("rotation", diverRotation);
        }
          diverPosition.x += 0.05;
          this.el.setAttribute("position", diverPosition);
      }
      if (e.key === "ArrowLeft") {
        if (diverRotation.y <360) {
          diverRotation.y += 0.5;
          this.el.setAttribute("rotation", diverRotation);
        }
          diverPosition.x -= 0.05;
          this.el.setAttribute("position", diverPosition);
      }
    });
  }
});

AFRAME.registerComponent("coins", {
  init: function () {
    for (var i = 1; i <= 10; i++) {
      const id = `coin${i}`;

      const posX = Math.random() * 100 + -50;
      const posY = Math.random() * 5 + 5;
      const posZ = Math.random() * 60 + -40;

      const position = { x: posX, y: posY, z: posZ };
      this.createCoins(id, position);
    }
  },
  createCoins: function (id, position) {
    const treasureEntity = document.querySelector("#treasureCoins");
    var coinEl = document.createElement("a-entity");

    coinEl.setAttribute("id", id);
    coinEl.setAttribute("position", position);
    coinEl.setAttribute("material", "color", "#ff9100");
   
    coinEl.setAttribute("geometry",{ primitive: "circle",radius: 1 });
    coinEl.setAttribute("static-body", {shape: "sphere", sphereRadius: 1});
    coinEl.setAttribute("game-play", {elementId: `#${id}`});

    coinEl.setAttribute("animation", {
      property: "rotation",
      to: "0 360 0",
      loop: "true",
      dur: Math.random()*1000+500+Math.random(),
    });     
    
    treasureEntity.appendChild(coinEl);
  }
});

AFRAME.registerComponent("fish", {
  init: function () {
    for (var i = 1; i <= 10; i++) {
      const id = `fish${i}`;

      const posX = Math.random() * 100 + -50;
      const posY = Math.random() * 5 + 5;
      const posZ = Math.random() * 60 + -40;
      const position = { x: posX, y: posY, z: posZ };
      this.genrateFish(id, position);
    }
  },
  genrateFish: function (id, position) {
    const fishModelEntity = document.querySelector("#fishModels");
    var fishEl = document.createElement("a-entity");

    fishEl.setAttribute("id", id);
    fishEl.setAttribute("position", position);
    fishEl.setAttribute("rotation", { x: 0, y: 180, z: 0 });

    fishEl.setAttribute("scale", { x: 0.3, y: 0.3, z: 0.3 });

    fishEl.setAttribute("gltf-model", "./assets/fish/scene.gltf");
    
    fishEl.setAttribute("static-body", {
      shape: "sphere",
      sphereRadius: 2
    });

     fishEl.setAttribute("game-play", {
      elementId: `#${id}`,
    });

    
    fishEl.setAttribute("animation", {
      property: "position",
      to: "100 10 -20",
      loop: "true",
      dur: 20000
    });

    fishEl.setAttribute("animation-mixer", {});

    fishModelEntity.appendChild(fishEl);
  }
});