import { describe, expect, test } from 'vitest';
import { ModelLoader } from 'examples/js/loader.js';

describe('Loader has method', () => {
  test('has returns false for an unloaded model', () => {
    const loader = new ModelLoader();

    expect(loader.has('foo')).toBeFalsy()
  });

});
