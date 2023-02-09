import { describe, expect, test } from 'vitest';
import { LoadedModelRegistry, ModelLoader } from 'examples/js/loader.js';

describe('LoadedModelRegistry', () => {
  test('has returns false for an unloaded model', () => {
    const registry = new LoadedModelRegistry();

    expect(registry.isEmpty()).toBeTruthy();
    expect(registry.has('foo')).toBeFalsy();
  });

  test('has returns true while loading and loaded, false otherwise', () => {
    const registry = new LoadedModelRegistry();

    expect(registry.has('jeep')).toBeFalsy();

    registry.loading('jeep', 'jeep_multi.glb');
    expect(registry.has('jeep')).toBeTruthy();

    registry.loaded('jeep', 'fake_object');
    expect(registry.has('jeep')).toBeTruthy();
  });

  test(`loading`, () => {
    const registry = new LoadedModelRegistry();
  });

  test('getModel returns a model if loaded, or throws an error otherwise', () => {
    const registry = new LoadedModelRegistry();

    expect(() => registry.getModel('jeep')).toThrowError('not loaded');

    registry.loading('jeep', 'url');
    expect(() => registry.getModel('jeep')).toThrowError('not loaded');

    registry.loaded('jeep', 'foo');
    expect(registry.getModel('jeep')).toEqual('foo');
  });

  test(`getUrl returns urls key exists, or throws an error otherwise`, () => {
    const registry = new LoadedModelRegistry()

    expect(() => registry.getUrl('jeep').toThrowError('not loaded'));

    registry.loading('jeep', 'url')
    expect(registry.getUrl('jeep')).toEqual('url')

    registry.loaded('jeep', 'model')
    expect(registry.getUrl(key)).toEqual('url')
  })

  test('isEmpty returns true if empty, false otherwise', () => {
    const registry = new LoadedModelRegistry();

    expect(registry.isEmpty()).toBeTruthy();

    registry.loading('jeep', 'jeep_multi.glb');
    registry.loaded('jeep', 'foo');
    expect(registry.isEmpty()).toBeFalsy();
  });

  test('isLoaded returns false while loading and true when loaded', () => {
    const registry = new LoadedModelRegistry();

    expect(registry.isLoaded('jeep')).toBeFalsy();

    registry.loading('jeep', 'jeep_multi.glb');
    expect(registry.isLoaded('jeep')).toBeFalsy();

    registry.loaded('jeep', 'fake_object');
    expect(registry.isLoaded('jeep')).toBeTruthy();
  });

  test('isLoading returns true while loading and false when loaded', () => {
    const registry = new LoadedModelRegistry();

    expect(registry.isLoading('jeep')).toBeFalsy();

    registry.loading('jeep', 'jeep_multi.glb');
    expect(registry.isLoading('jeep')).toBeTruthy();

    registry.loaded('jeep', 'fake_object');
    expect(registry.isLoading('jeep')).toBeFalsy();
  });
});
