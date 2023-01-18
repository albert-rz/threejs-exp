import {
  BoxGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshBasicMaterial,
  Object3D,
  Vector3,
} from 'three';

export function buildPrism(
  width = 5,
  height = 5,
  depth = 10,
  color = 0x333333,
  x = 0,
  y = 0,
  z = 0
) {
  const prism = new Mesh(
    new BoxGeometry(width, height, depth),
    new MeshLambertMaterial({ color: color, flatShading: true })
  );
  prism.position.x = x;
  prism.position.y = y;
  prism.position.z = z;

  return prism;
}

export function buildCar(color = 0xff0000) {
  const car = new Group();

  // Car size
  const width = 5;
  const length = 15;

  // Wheels
  const radius = 4;
  const pos = [
    { x: length / 2 - 2, y: radius / 2, z: 2.5 },
    { x: length / 2 - 2, y: radius / 2, z: -2.5 },
    { x: -(length / 2 - 2), y: radius / 2, z: 2.5 },
    { x: -(length / 2 - 2), y: radius / 2, z: -2.5 },
  ];
  for (let i in pos) {
    console.log(pos[i]);
    car.add(buildPrism(radius, radius, 1.5, 0x3333333, pos[i].x, pos[i].y, pos[i].z));
  }

  return car;
}

export class Prism extends Mesh {
  constructor(width, height, depth, color, x = 0, y = 0, z = 0) {
    super(
      new BoxGeometry(width, height, depth),
      new MeshLambertMaterial({ color: color, flatShading: true })
    );

    this.position.set(x, y, z);
  }

  get width() {
    return this.geometry.parameters.width;
  }

  get height() {
    return this.geometry.parameters.height;
  }

  get depth() {
    return this.geometry.parameters.depth;
  }

  get color() {
    return this.material.color.getHexString();
  }

  speak() {
    console.log(this.width, this.height, this.depth, this.color);
  }

  update({ width = null, height = null, depth = null } = {}) {
    let [w, h, d] = [this.width, this.height, this.depth];

    if (width != null) {
      w = width;
    }

    if (height != null) {
      h = height;
    }

    if (depth != null) {
      d = depth;
    }

    this.geometry.dispose();
    this.geometry = new BoxGeometry(w, h, d);
  }
}

export class Wheel extends Prism {
  constructor({ radius = null, depth = null, color = 0xfafa00, x = 0, y = 0, z = 0 } = {}) {
    super(radius, radius, depth, color, x, y, z);
  }
}

export class Car extends Group {
  constructor(width, height, lenght, color) {
    super();

    // Wheels
    this.add(new Wheel({ radius: 5, depth: 2 }));
  }
}
