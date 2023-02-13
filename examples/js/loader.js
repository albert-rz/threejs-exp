import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class LoadedModelRegister {
  constructor() {
    this._records = {};
  }

  get keys() {
    return Object.keys(this._records);
  }

  has(key) {
    return this.keys.includes(key);
  }

  loading(key, url) {
    if (this.isLoading(key)) {
      throw `${key} is already loading`;
    }

    this._records[key] = {
      url: url,
      model: null,
    };
  }

  loaded(key, model) {
    if (!this.isLoading(key)) {
      throw 'loading method must be called first';
    }

    this._records[key]['model'] = model;
  }

  getModel(key) {
    if (this.has(key) && this.isLoaded(key)) {
      return this._records[key]['model'];
    }

    throw `${key} is not loaded`;
  }

  getUrl(key) {
    if (this.has(key)) {
      return this._records[key]['url'];
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

    return this._records[key]['model'] == null;
  }

  isLoaded(key) {
    if (!this.has(key)) {
      return false;
    }

    return this._records[key]['model'] != null;
  }

  allLoaded() {
    for (const key of this.keys) {
      if (!this.isLoaded(key)) {
        return false;
      }
    }

    return true;
  }

  speak() {
    console.table(this._records);
  }
}

export class ModelLoader {
  constructor() {
    this._register = new LoadedModelRegister();
  }

  load(key, url) {
    if (this._register.has(key)) {
      console.log(`Model ${key} already exists`);
      return;
    }

    this._register.loading(key, url);

    const loader = new GLTFLoader();
    loader.load(
      url,
      // called when loaded
      (gltf) => {
        this._register.loaded(key, gltf.scene);
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

  getModel(key) {
    return this._register.getModel(key);
  }

  getUrl(key) {
    return this._register.getUrl(key)
  }

  allLoaded() {
    return this._register.allLoaded();
  }

  speak() {
    this._register.speak();
  }
}
