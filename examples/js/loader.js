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

  get(key) {
    try {
    if (!this.isLoaded(key)) {
      throw `${key} is not loaded`
    }

    return this._registers[key]["model"]
  }

  isEmpty() {
    return this.keys.length == 0;
  }

  isLoaded(key) {
    return this._registers[key]['model'] != null;
  }

  speak() {
    console.table(this._registers);
  }
}

export class ModelLoader {
  constructor() {
    this._registry = new LoadedModelRegistry();
  }

  load(key, url) {
    if (this._registry.has(key)) {
      console.log(`Model ${key} already exists`);
      return;
    }

    this._registry.loading(key, url);

    // models["ref"] = true
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        this._registry.loaded(key, gltf.scene);
      },
      // called while loading is progressing
      function (xhr) {
        console.log(`${key} is ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      // called when loading has errors
      function (error) {
        console.log('An error happened');
      }
    );
  }

  get(key) {
    return this._registry.get(key)
  }

  speak() {
    this._registry.speak();
  }
}
