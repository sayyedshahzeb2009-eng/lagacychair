function createChair(type = "black") {

  const materials = createMaterials(type);
  const chair = new THREE.Group();

  // =========================================================
  // EXTRA MATERIALS
  // =========================================================

  const leather = materials.main;

  const cushion = new THREE.MeshStandardMaterial({
    color: materials.main.color,
    roughness: 0.48,
    metalness: 0.02
  });

  const seam = new THREE.MeshStandardMaterial({
    color: 0x090909,
    roughness: 0.7,
    metalness: 0
  });

  const chrome = new THREE.MeshStandardMaterial({
    color: 0xaaa79e,
    roughness: 0.16,
    metalness: 0.95
  });

  const rubber = new THREE.MeshStandardMaterial({
    color: 0x080808,
    roughness: 0.8,
    metalness: 0.05
  });

  const gold = materials.gold;

  // =========================================================
  // BACKREST — LARGE EXECUTIVE SHAPE
  // =========================================================

  const backOuter = roundedBox(
    3.05,
    4.25,
    0.62,
    0.38,
    leather
  );

  backOuter.position.set(0, 3.05, 0);

  backOuter.rotation.x =
    THREE.MathUtils.degToRad(-5);

  chair.add(backOuter);


  // =========================================================
  // BACK INNER CUSHION
  // =========================================================

  const backCushion = roundedBox(
    2.55,
    3.55,
    0.28,
    0.28,
    cushion
  );

  backCushion.position.set(
    0,
    3.02,
    -0.38
  );

  backCushion.rotation.x =
    THREE.MathUtils.degToRad(-5);

  chair.add(backCushion);


  // =========================================================
  // BACK SHOULDER PADDING
  // =========================================================

  const shoulderLeft = roundedBox(
    0.48,
    2.75,
    0.18,
    0.18,
    cushion
  );

  shoulderLeft.position.set(
    -1.0,
    3.15,
    -0.56
  );

  shoulderLeft.rotation.z =
    THREE.MathUtils.degToRad(-3);

  chair.add(shoulderLeft);


  const shoulderRight = shoulderLeft.clone();

  shoulderRight.position.x = 1.0;

  shoulderRight.rotation.z =
    THREE.MathUtils.degToRad(3);

  chair.add(shoulderRight);


  // =========================================================
  // CENTRAL BACK DESIGN
  // =========================================================

  const centerPanel = roundedBox(
    1.35,
    2.75,
    0.12,
    0.20,
    seam
  );

  centerPanel.position.set(
    0,
    3.0,
    -0.61
  );

  centerPanel.rotation.x =
    THREE.MathUtils.degToRad(-5);

  chair.add(centerPanel);


  // =========================================================
  // VERTICAL GOLD SIGNATURE
  // =========================================================

  const signature = roundedBox(
    0.07,
    2.35,
    0.08,
    0.025,
    gold
  );

  signature.position.set(
    0,
    3.05,
    -0.69
  );

  signature.rotation.x =
    THREE.MathUtils.degToRad(-5);

  chair.add(signature);


  // =========================================================
  // HEADREST
  // =========================================================

  const headrest = roundedBox(
    1.65,
    0.62,
    0.34,
    0.22,
    cushion
  );

  headrest.position.set(
    0,
    4.45,
    -0.45
  );

  headrest.rotation.x =
    THREE.MathUtils.degToRad(-8);

  chair.add(headrest);


  // =========================================================
  // HEADREST GOLD DETAIL
  // =========================================================

  const headAccent = roundedBox(
    0.65,
    0.035,
    0.04,
    0.015,
    gold
  );

  headAccent.position.set(
    0,
    4.45,
    -0.65
  );

  headAccent.rotation.x =
    THREE.MathUtils.degToRad(-8);

  chair.add(headAccent);


  // =========================================================
  // SEAT BASE
  // =========================================================

  const seatBase = roundedBox(
    3.55,
    0.72,
    3.0,
    0.38,
    leather
  );

  seatBase.position.y = 0.72;

  chair.add(seatBase);


  // =========================================================
  // SEAT CUSHION
  // =========================================================

  const seatCushion = roundedBox(
    3.18,
    0.58,
    2.62,
    0.30,
    cushion
  );

  seatCushion.position.set(
    0,
    1.05,
    0.10
  );

  chair.add(seatCushion);


  // =========================================================
  // FRONT WATERFALL CUSHION
  // =========================================================

  const frontCushion = roundedBox(
    3.12,
    0.30,
    0.42,
    0.12,
    cushion
  );

  frontCushion.position.set(
    0,
    0.82,
    1.28
  );

  chair.add(frontCushion);


  // =========================================================
  // SEAT CENTER DETAIL
  // =========================================================

  const seatLine = roundedBox(
    0.045,
    0.06,
    2.15,
    0.02,
    seam
  );

  seatLine.position.set(
    0,
    1.37,
    0.05
  );

  chair.add(seatLine);


  // =========================================================
  // ARM SUPPORTS
  // =========================================================

  const armSupportGeometry =
    new THREE.CylinderGeometry(
      0.14,
      0.18,
      1.45,
      32
    );

  const armLeft = new THREE.Mesh(
    armSupportGeometry,
    chrome
  );

  armLeft.position.set(
    -1.58,
    1.82,
    0.05
  );

  armLeft.rotation.z =
    THREE.MathUtils.degToRad(-8);

  chair.add(armLeft);


  const armRight = armLeft.clone();

  armRight.position.x = 1.58;

  armRight.rotation.z =
    THREE.MathUtils.degToRad(8);

  chair.add(armRight);


  // =========================================================
  // ARM PADS
  // =========================================================

  const armPadLeft = roundedBox(
    0.78,
    0.25,
    0.70,
    0.14,
    cushion
  );

  armPadLeft.position.set(
    -1.58,
    2.55,
    0.05
  );

  chair.add(armPadLeft);


  const armPadRight = armPadLeft.clone();

  armPadRight.position.x = 1.58;

  chair.add(armPadRight);


  // =========================================================
  // ARM GOLD ACCENTS
  // =========================================================

  const armAccentLeft = roundedBox(
    0.10,
    0.08,
    0.42,
    0.03,
    gold
  );

  armAccentLeft.position.set(
    -1.58,
    2.70,
    0.05
  );

  chair.add(armAccentLeft);


  const armAccentRight = armAccentLeft.clone();

  armAccentRight.position.x = 1.58;

  chair.add(armAccentRight);


  // =========================================================
  // CENTRAL GAS COLUMN
  // =========================================================

  const column = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.23,
      0.30,
      2.15,
      40
    ),
    chrome
  );

  column.position.y = -0.35;

  chair.add(column);


  // =========================================================
  // GAS LIFT COLLAR
  // =========================================================

  const collar = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.38,
      0.38,
      0.22,
      40
    ),
    chrome
  );

  collar.position.y = 0.65;

  chair.add(collar);


  // =========================================================
  // FIVE STAR BASE
  // =========================================================

  const base = new THREE.Group();

  for (let i = 0; i < 5; i++) {

    const angle =
      (Math.PI * 2 / 5) * i;

    // Main star arm
    const arm = roundedBox(
      3.25,
      0.18,
      0.30,
      0.08,
      chrome
    );

    arm.position.set(
      Math.cos(angle) * 1.35,
      -1.48,
      Math.sin(angle) * 1.35
    );

    arm.rotation.y = angle;

    base.add(arm);


    // Gold accent on each arm
    const armGold = roundedBox(
      1.20,
      0.045,
      0.045,
      0.015,
      gold
    );

    armGold.position.set(
      Math.cos(angle) * 1.75,
      -1.36,
      Math.sin(angle) * 1.75
    );

    armGold.rotation.y = angle;

    base.add(armGold);


    // Wheel housing
    const wheelHousing = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.22,
        0.22,
        0.35,
        32
      ),
      rubber
    );

    wheelHousing.rotation.z =
      Math.PI / 2;

    wheelHousing.position.set(
      Math.cos(angle) * 2.65,
      -1.62,
      Math.sin(angle) * 2.65
    );

    base.add(wheelHousing);


    // Wheel
    const wheel = new THREE.Mesh(
      new THREE.TorusGeometry(
        0.18,
        0.075,
        12,
        32
      ),
      rubber
    );

    wheel.rotation.y =
      angle;

    wheel.position.set(
      Math.cos(angle) * 2.65,
      -1.78,
      Math.sin(angle) * 2.65
    );

    base.add(wheel);
  }

  chair.add(base);


  // =========================================================
  // CENTRAL BASE CAP
  // =========================================================

  const baseCap = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.55,
      0.55,
      0.22,
      48
    ),
    chrome
  );

  baseCap.position.y = -1.47;

  chair.add(baseCap);


  // =========================================================
  // GOLD LEGACY EMBLEM
  // =========================================================

  const emblem = new THREE.Mesh(
    new THREE.TorusGeometry(
      0.24,
      0.045,
      12,
      32
    ),
    gold
  );

  emblem.position.set(
    0,
    3.02,
    -0.70
  );

  emblem.rotation.x =
    THREE.MathUtils.degToRad(-5);

  chair.add(emblem);


  // =========================================================
  // FINAL POSITION
  // =========================================================

  chair.position.y = 0.35;

  // Slightly larger presentation
  chair.scale.set(
    1.05,
    1.05,
    1.05
  );

  return chair;
}
