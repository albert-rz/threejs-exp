import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ModelLoader {
  constructor() {
    this._models = {}
  }

  load(ref, url) {

  }

  get models() {
    return Object.keys(this._models);
  }

  has(ref) {
    console.log('hola')
  }

  speak() {
    console.log(this.loaded)
  }
}
