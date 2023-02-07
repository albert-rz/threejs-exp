import { describe, expect, test } from 'vitest';
import { LoadedModelRegistry, ModelLoader } from 'examples/js/loader.js';

describe('LoadedModelRegistry', () => {
  test('has returns false for an unloaded model', () => {
    const registry = new LoadedModelRegistry();

    expect(registry.isEmpty()).toBeTruthy();
    expect(registry.has('foo')).toBeFalsy();
  });

  test('has returns true while loading and loaded', () => {
    const registry = new LoadedModelRegistry();

    registry.loading('jeep', 'jeep_multi.glb');
    expect(registry.has('jeep')).toBeTruthy();

    registry.loaded('jeep', 'fake_object');
    expect(registry.has('jeep')).toBeTruthy();
  });

  test('isLoaded returns false while loading and true when loaded', () => {
    const registry = new LoadedModelRegistry();

    registry.loading('jeep', 'jeep_multi.glb');
    expect(registry.isLoaded('jeep')).toBeFalsy();

    registry.loaded('jeep', 'fake_object');
    expect(registry.isLoaded('jeep')).toBeTruthy();
  })

  test('get returns model if loaded, or throws an exception otherwise', () => {
    const registry = new LoadedModelRegistry();

    registry.get('jeep')

    registry.loading('jeep', 'jeep_multi.glb');
    registry.loaded('jeep', 'foo');

    expect(registry.get('jeep')).toEqual('foo')
  })
});
