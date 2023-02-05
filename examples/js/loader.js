import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class LoadedModelRegistry {
  constructor() {
    this._registers = {};
  }

  get keys() {
    return Object.keys(this._registers);
  }

  has(key) {
    return this.keys.includes(key);
  }

  loading(key, url) {
    this._registers[key] = {
      url: url,
      model: null,
    };
  }

  loaded(key, model) {
    this._registers[key]['model'] = model;
  }

  isEmpty() {
    return this.keys.length == 0;
  }

  isLoaded(key) {
    return this._registers[key]["loaded"] != null
  }
}

export class ModelLoader {
  constructor() {
    this._models = {};
  }

  load(ref, url) {
    if (this.has(ref)) {
      console.log('Model already loaded');
      return;
    }

    this.#prepare(ref);

    // models["ref"] = true
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        this.#add(ref, gltf.scene);
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
    return this.models.includes(ref);
  }

  #prepare(ref) {
    this._models[ref] = {
      url: url,
      loaded: false,
      model: null,
    };
  }

  #add(ref, model) {
    this._models[ref]['model'] = model;
    this._models[ref]['loaded'] = true;
  }

  speak() {
    console.log(this._models);
  }
}
