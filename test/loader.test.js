import { describe, expect, test } from 'vitest';
import { ModelLoader } from 'examples/js/loader.js';

describe('Loader has method', () => {
  test('has returns false for an unloaded model', () => {
    const loader = new ModelLoader();

    if (process.env.NODE_ENV == "hola") {
      expect(loader.has('foo')).toBeFalsy();
    }
    else {
      expect(loader.has('foo')).toBeTruthy();
    }
  });

  test('add then has', () => {
    const loader = new ModelLoader();

  })
});
