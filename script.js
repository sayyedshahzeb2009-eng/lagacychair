/* =========================================================
   LEGACY CHAIRS
   3D EXPERIENCE ENGINE
========================================================= */

const THREE = window.THREE;


/* =========================================================
   SETTINGS
========================================================= */

const WHATSAPP_NUMBER = "919876543210";


/* =========================================================
   BASIC HELPERS
========================================================= */

function roundedBox(
  width,
  height,
  depth,
  radius,
  material
) {

  const shape = new THREE.Shape();

  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);

  shape.lineTo(x + width - radius, y);

  shape.quadraticCurveTo(
    x + width,
    y,
    x + width,
    y + radius
  );

  shape.lineTo(
    x + width,
    y + height - radius
  );

  shape.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height
  );

  shape.lineTo(
    x + radius,
    y + height
  );

  shape.quadraticCurveTo(
    x,
    y + height,
    x,
    y + height - radius
  );

  shape.lineTo(
    x,
    y + radius
  );

  shape.quadraticCurveTo(
    x,
    y,
    x + radius,
    y
  );


  const geometry =
    new THREE.ExtrudeGeometry(
      shape,
      {
        depth: depth,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize: radius * .35,
        bevelThickness: radius * .35
      }
    );


  geometry.center();

  return new THREE.Mesh(
    geometry,
    material
  );

}


function cylinder(
  radius,
  height,
  material
) {

  const geometry =
    new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      32
    );

  return new THREE.Mesh(
    geometry,
    material
  );

}


/* =========================================================
   MATERIALS
========================================================= */

function createMaterials(type) {

  let mainColor = 0x191916;

  if (type === "red") {
    mainColor = 0x541f1b;
  }

  if (type === "cream") {
    mainColor = 0xb79d75;
  }

  if (type === "brown") {
    mainColor = 0x4d2d1c;
  }


  return {

    main:
      new THREE.MeshStandardMaterial({
        color: mainColor,
        roughness: .32,
        metalness: .05
      }),

    dark:
      new THREE.MeshStandardMaterial({
        color: 0x171715,
        roughness: .25,
        metalness: .65
      }),

    metal:
      new THREE.MeshStandardMaterial({
        color: 0x77736a,
        roughness: .22,
        metalness: .9
      }),

    gold:
      new THREE.MeshStandardMaterial({
        color: 0xc7a56a,
        roughness: .25,
        metalness: .75
      })

  };

}


/* =========================================================
   CREATE CHAIR
========================================================= */

function createChair(type = "black") {

  const materials =
    createMaterials(type);

  const chair =
    new THREE.Group();


  /* ---------------- BACK ---------------- */

  const back =
    roundedBox(
      2.55,
      3.6,
      .52,
      .34,
      materials.main
    );

  back.position.y = 3.1;

  back.rotation.x =
    THREE.MathUtils.degToRad(-4);

  chair.add(back);


  /* ---------------- BACK INNER PANEL ---------------- */

  const inner =
    roundedBox(
      1.45,
      2.45,
      .08,
      .25,
      materials.dark
    );

  inner.position.set(
    0,
    3.05,
    -.3
  );

  chair.add(inner);


  /* ---------------- SEAT ---------------- */

  const seat =
    roundedBox(
      3.3,
      .75,
      2.65,
      .32,
      materials.main
    );

  seat.position.y = .95;

  chair.add(seat);


  /* ---------------- SEAT EDGE ---------------- */

  const seatEdge =
    roundedBox(
      3.45,
      .25,
      2.75,
      .12,
      materials.dark
    );

  seatEdge.position.y = .65;

  chair.add(seatEdge);


  /* ---------------- ARMS ---------------- */

  const armLeft =
    cylinder(
      .15,
      1.55,
      materials.dark
    );

  armLeft.position.set(
    -1.55,
    1.8,
    .15
  );

  armLeft.rotation.z =
    THREE.MathUtils.degToRad(-8);

  chair.add(armLeft);


  const armRight =
    armLeft.clone();

  armRight.position.x = 1.55;

  armRight.rotation.z =
    THREE.MathUtils.degToRad(8);

  chair.add(armRight);


  /* ---------------- ARM PADS ---------------- */

  const armPad =
    roundedBox(
      .75,
      .2,
      .5,
      .1,
      materials.main
    );

  armPad.position.set(
    -1.55,
    2.45,
    .15
  );

  chair.add(armPad);


  const armPad2 =
    armPad.clone();

  armPad2.position.x = 1.55;

  chair.add(armPad2);


  /* ---------------- CENTRAL COLUMN ---------------- */

  const column =
    cylinder(
      .18,
      2.5,
      materials.metal
    );

  column.position.y = -.25;

  chair.add(column);


  /* ---------------- GAS LIFT ---------------- */

  const lift =
    cylinder(
      .3,
      .35,
      materials.dark
    );

  lift.position.y = .7;

  chair.add(lift);


  /* ---------------- BASE ---------------- */

  const base =
    new THREE.Group();


  for (
    let i = 0;
    i < 5;
    i++
  ) {

    const angle =
      (Math.PI * 2 / 5) * i;

    const arm =
      roundedBox(
        2.6,
        .16,
        .22,
        .08,
        materials.metal
      );

    arm.position.y = -1.45;

    arm.rotation.y = angle;

    arm.position.x =
      Math.cos(angle) * 1.15;

    arm.position.z =
      Math.sin(angle) * 1.15;

    base.add(arm);


    const wheel =
      cylinder(
        .18,
        .3,
        materials.dark
      );

    wheel.rotation.z =
      Math.PI / 2;

    wheel.position.x =
      Math.cos(angle) * 2.25;

    wheel.position.z =
      Math.sin(angle) * 2.25;

    wheel.position.y = -1.55;

    base.add(wheel);

  }


  chair.add(base);


  /* ---------------- GOLD ACCENT ---------------- */

  const accent =
    roundedBox(
      .08,
      2.6,
      .06,
      .02,
      materials.gold
    );

  accent.position.set(
    0,
    3.1,
    -.58
  );

  chair.add(accent);


  chair.position.y =
    .35;


  return chair;

}


/* =========================================================
   THREE SCENE FACTORY
========================================================= */

function createScene(
  container,
  type,
  options = {}
) {

  if (!container) {
    return null;
  }


  const scene =
    new THREE.Scene();


  const camera =
    new THREE.PerspectiveCamera(
      options.fov || 35,
      container.clientWidth /
      container.clientHeight,
      .1,
      100
    );


  camera.position.set(
    0,
    1.7,
    options.cameraZ || 10
  );


  const renderer =
    new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });


  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  );


  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );


  renderer.outputEncoding =
    THREE.sRGBEncoding;


  renderer.shadowMap.enabled = true;

  container.innerHTML = "";

  container.appendChild(
    renderer.domElement
  );


  /* LIGHTING */

  const ambient =
    new THREE.HemisphereLight(
      0xfff7e7,
      0x11110f,
      2
    );

  scene.add(ambient);


  const key =
    new THREE.DirectionalLight(
      0xffe4b4,
      4
    );

  key.position.set(
    5,
    8,
    6
  );

  key.castShadow = true;

  scene.add(key);


  const fill =
    new THREE.DirectionalLight(
      0x8796b7,
      1.8
    );

  fill.position.set(
    -6,
    4,
    3
  );

  scene.add(fill);


  const rim =
    new THREE.PointLight(
      0xc7a56a,
      4,
      20
    );

  rim.position.set(
    0,
    4,
    -5
  );

  scene.add(rim);


  /* CHAIR */

  const chair =
    createChair(type);

  scene.add(chair);


  /* FLOOR SHADOW */

  const shadowGeometry =
    new THREE.CircleGeometry(
      3.8,
      64
    );

  const shadowMaterial =
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: .32
    });

  const shadow =
    new THREE.Mesh(
      shadowGeometry,
      shadowMaterial
    );

  shadow.rotation.x =
    -Math.PI / 2;

  shadow.position.y =
    -1.65;

  scene.add(shadow);


  /* INTERACTION */

  let targetRotation = 0;

  let currentRotation = 0;

  let targetX = 0;

  let currentX = 0;

  let dragging = false;

  let lastX = 0;


  renderer.domElement.addEventListener(
    "pointerdown",
    e => {

      dragging = true;

      lastX = e.clientX;

      renderer.domElement.setPointerCapture(
        e.pointerId
      );

    }
  );


  renderer.domElement.addEventListener(
    "pointermove",
    e => {

      if (dragging) {

        const delta =
          e.clientX - lastX;

        targetRotation +=
          delta * .012;

        lastX = e.clientX;

      }

    }
  );


  renderer.domElement.addEventListener(
    "pointerup",
    () => {

      dragging = false;

    }
  );


  renderer.domElement.addEventListener(
    "pointerleave",
    () => {

      dragging = false;

    }
  );


  /* MOUSE PARALLAX */

  if (!options.small) {

    window.addEventListener(
      "mousemove",
      e => {

        if (dragging) return;

        const x =
          (e.clientX /
            window.innerWidth) -
          .5;

        const y =
          (e.clientY /
            window.innerHeight) -
          .5;

        targetX = y * .3;

        if (options.hero) {

          targetRotation =
            x * .5;

        }

      }
    );

  }


  /* ANIMATION */

  const clock =
    new THREE.Clock();


  function animate() {

    requestAnimationFrame(
      animate
    );


    const elapsed =
      clock.getElapsedTime();


    currentRotation +=
      (targetRotation -
        currentRotation) *
      .07;


    currentX +=
      (targetX -
        currentX) *
      .05;


    chair.rotation.y =
      currentRotation;


    chair.rotation.x =
      currentX;


    if (!dragging) {

      if (options.hero) {

        targetRotation +=
          .002;

      } else {

        targetRotation +=
          .0018;

      }

    }


    chair.position.y =
      .35 +
      Math.sin(elapsed * 1.4) *
      .06;


    renderer.render(
      scene,
      camera
    );

  }


  animate();


  /* RESIZE */

  const resize =
    () => {

      if (
        container.clientWidth === 0 ||
        container.clientHeight === 0
      ) {
        return;
      }


      camera.aspect =
        container.clientWidth /
        container.clientHeight;


      camera.updateProjectionMatrix();


      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );

    };


  window.addEventListener(
    "resize",
    resize
  );


  return {
    scene,
    camera,
    renderer,
    chair,
    resize
  };

}


/* =========================================================
   HERO 3D
========================================================= */

const heroCanvas =
  document.getElementById(
    "heroCanvas"
  );


const heroScene =
  createScene(
    heroCanvas,
    "black",
    {
      hero: true,
      cameraZ: 10,
      fov: 35
    }
  );


/* =========================================================
   PRODUCT 3D MODELS
========================================================= */

const productScenes = [];


document
  .querySelectorAll(
    ".product-canvas"
  )
  .forEach(
    container => {

      const type =
        container.dataset.chair ||
        "black";


      const scene =
        createScene(
          container,
          type,
          {
            small: true,
            cameraZ: 9,
            fov: 38
          }
        );


      if (scene) {
        productScenes.push(
          scene
        );
      }

    }
  );


/* =========================================================
   MODAL 3D
========================================================= */

let modalScene = null;


const modalCanvas =
  document.getElementById(
    "modalCanvas"
  );


/* =========================================================
   FILTER
========================================================= */

const filters =
  document.querySelectorAll(
    ".filter"
  );


const cards =
  document.querySelectorAll(
    ".product-card"
  );


filters.forEach(
  filter => {

    filter.addEventListener(
      "click",
      () => {

        filters.forEach(
          button =>
            button.classList.remove(
              "active"
            )
        );


        filter.classList.add(
          "active"
        );


        const selected =
          filter.dataset.filter;


        cards.forEach(
          card => {

            const category =
              card.dataset.category;


            if (
              selected === "all" ||
              category === selected
            ) {

              card.classList.remove(
                "hidden"
              );

              setTimeout(
                () => {
                  card.classList.add(
                    "visible"
                  );
                },
                50
              );

            } else {

              card.classList.remove(
                "visible"
              );

              card.classList.add(
                "hidden"
              );

            }

          }
        );

      }
    );

  }
);


/* =========================================================
   PRODUCT MODAL
========================================================= */

const modal =
  document.getElementById(
    "productModal"
  );


const modalClose =
  document.getElementById(
    "modalClose"
  );


const modalProduct =
  document.getElementById(
    "modalProduct"
  );


const modalPrice =
  document.getElementById(
    "modalPrice"
  );


const modalWhatsapp =
  document.getElementById(
    "modalWhatsapp"
  );


cards.forEach(
  card => {

    const button =
      card.querySelector(
        ".product-button"
      );


    button.addEventListener(
      "click",
      () => {

        const name =
          card.dataset.product;

        const price =
          card.dataset.price;


        modalProduct.textContent =
          name;

        modalPrice.textContent =
          price;


        const message =
          `Hello Legacy Chairs!%0A%0A` +
          `I am interested in ${name}.%0A` +
          `Price shown: ${price}.%0A%0A` +
          `Please share availability, colours and details.`;


        modalWhatsapp.href =
          `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


        modal.classList.add(
          "open"
        );


        setTimeout(
          () => {

            if (modalScene) {

              modalScene.renderer.dispose();

            }


            modalScene =
              createScene(
                modalCanvas,
                "black",
                {
                  cameraZ: 9,
                  fov: 35
                }
              );

          },
          50
        );

      }
    );

  }
);


modalClose.addEventListener(
  "click",
  () => {

    modal.classList.remove(
      "open"
    );

  }
);


modal.addEventListener(
  "click",
  e => {

    if (
      e.target === modal
    ) {

      modal.classList.remove(
        "open"
      );

    }

  }
);


/* =========================================================
   WHATSAPP
========================================================= */

const whatsappMain =
  document.getElementById(
    "whatsappMain"
  );


const mainMessage =
  "Hello Legacy Chairs! I would like to explore your premium chair collection.";


whatsappMain.href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mainMessage)}`;


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
  document.getElementById(
    "menuButton"
  );


const mobileMenu =
  document.getElementById(
    "mobileMenu"
  );


menuButton.addEventListener(
  "click",
  () => {

    mobileMenu.classList.toggle(
      "open"
    );

  }
);


mobileMenu
  .querySelectorAll("a")
  .forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.classList.remove(
            "open"
          );

        }
      );

    }
  );


/* =========================================================
   CURSOR
========================================================= */

const cursor =
  document.querySelector(
    ".cursor"
  );


if (
  window.matchMedia(
    "(pointer:fine)"
  ).matches
) {

  window.addEventListener(
    "mousemove",
    e => {

      cursor.style.left =
        `${e.clientX}px`;

      cursor.style.top =
        `${e.clientY}px`;

    }
  );


  document
    .querySelectorAll(
      "a, button"
    )
    .forEach(
      element => {

        element.addEventListener(
          "mouseenter",
          () => {

            cursor.style.width =
              "45px";

            cursor.style.height =
              "45px";

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursor.style.width =
              "25px";

            cursor.style.height =
              "25px";

          }
        );

      }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "visible"
            );

          }

        }
      );

    },
    {
      threshold: .12
    }
  );


cards.forEach(
  card =>
    revealObserver.observe(
      card
    )
);


/* =========================================================
   YEAR
========================================================= */

document.getElementById(
  "year"
).textContent =
  new Date().getFullYear();


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  e => {

    if (
      e.key === "Escape"
    ) {

      modal.classList.remove(
        "open"
      );

      mobileMenu.classList.remove(
        "open"
      );

    }

  }
);
