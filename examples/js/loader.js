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
    if (this.isLoading(key)) {
      throw `${key} is already loading`;
    }

    this._registers[key] = {
      url: url,
      model: null,
    };
  }

  loaded(key, model) {
    this._registers[key]['model'] = model;
  }

  getModel(key) {
    if (this.has(key) && this.isLoaded(key)) {
      return this._registers[key]['model'];
    }

    throw `${key} is not loaded`;
  }

  getUrl(key) {
    if (this.has(key)) {
      return this._registers[key]['url'];
    }

    throw `${key} is not loaded`;
  }

  isEmpty() {
    return this.keys.length == 0;
  }

  isLoading(key) {
    if (!this.has(key)) {
      return false;
    }

    return this._registers[key]['model'] == null;
  }

  isLoaded(key) {
    if (!this.has(key)) {
      return false;
    }

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

    const loader = new GLTFLoader();
    loader.load(
      url,
      // called when loaded
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
    return this._registry.get(key);
  }

  speak() {
    this._registry.speak();
  }
}
