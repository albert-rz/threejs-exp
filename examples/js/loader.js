import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ModelLoader {
  constructor() {
    this._models = {};
  }

  load(ref, url) {
    if (this.has(ref)) {
      console.log('Model already loaded');
      return;
    }

    this._models[ref] = {
      "url": url,
      "loaded": false,
      "model": null
    }

    // models["ref"] = true
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        this._models[ref]["model"] = gltf.scene
        this._models[ref]["loaded"] = true
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.log('An error happened');
      }
    );
  }

  get models() {
    return Object.keys(this._models);
  }

  has(ref) {
    return this.models.includes(ref)
  }

  speak() {
    console.log(this._models);
  }
}
