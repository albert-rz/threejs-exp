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

export class Box extends Mesh {
  constructor(sizeX, sizeY, sizeZ, color, x = 0, y = 0, z = 0) {
    super(
      new BoxGeometry(sizeX, sizeY, sizeZ),
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

class Wheel extends Box {
  constructor({ radius = null, thickness = null, color = 0xfafa00, x = 0, y = 0, z = 0 } = {}) {
    super(radius, radius, thickness, color, x, y, z);
  }
}

class Body extends Box {
  constructor({width = null, length = null, height = null, color = 0xff0000, x = 0, y = 0, z = 0}) {
    // super(width, )
    super(length, height, width, color, x, y, z);
  }
}

export class Car extends Group {
  constructor(length, width, height, color) {
    super();

    const radius = 4
    const thick = 2

    // Wheels
    this.add(new Wheel({ radius: radius, thickness: thick, y: radius/2, z: width/2 - thick/2 + 0.2}));
    this.add(new Body({width: width, length: length, height: height, y: height/2 + thick/2}))
  }
}
