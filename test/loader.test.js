import { describe, expect, test } from 'vitest';
import { LoadedModelRegister, ModelLoader } from 'examples/js/loader.js';

describe('LoadedModelRegister', () => {
  test('keys returns keys in register', () => {
    const register = new LoadedModelRegister();

    expect(register.keys.length).toEqual(0)

    register.loading('jeep', 'jeep.url')
    expect(JSON.stringify(register.keys) == JSON.stringify(['jeep'])).toBeTruthy()

    register.loading('plane', 'plane.url')
    expect(JSON.stringify(register.keys) == JSON.stringify(['jeep', 'plane'])).toBeTruthy()
  });

  test('has returns false for an unloaded model', () => {
    const register = new LoadedModelRegister();

    expect(register.isEmpty()).toBeTruthy();
    expect(register.has('foo')).toBeFalsy();
  });

  test('has returns true while loading and loaded, false otherwise', () => {
    const register = new LoadedModelRegister();

    expect(register.has('jeep')).toBeFalsy();

    register.loading('jeep', 'jeep_multi.glb');
    expect(register.has('jeep')).toBeTruthy();

    register.loaded('jeep', 'fake_object');
    expect(register.has('jeep')).toBeTruthy();
  });

  test('loading', () => {
    const register = new LoadedModelRegister();
  });

  test('getModel returns a model if loaded, or throws an error otherwise', () => {
    const register = new LoadedModelRegister();

    expect(() => register.getModel('jeep')).toThrowError('not loaded');

    register.loading('jeep', 'url');
    expect(() => register.getModel('jeep')).toThrowError('not loaded');

    register.loaded('jeep', 'foo');
    expect(register.getModel('jeep')).toEqual('foo');
  });

  test('getUrl returns urls key if exists, or throws an error otherwise', () => {
    const register = new LoadedModelRegister();

    expect(() => register.getUrl('jeep').toThrowError('not loaded'));

    register.loading('jeep', 'url');
    expect(register.getUrl('jeep')).toEqual('url');

    register.loaded('jeep', 'model');
    expect(register.getUrl('jeep')).toEqual('url');
  });

  test('loading cnnot be called twice', () => {
    const register = new LoadedModelRegister();

    register.loading('jeep', 'jeep.url')
    expect(() => register.loading('jeep', 'jeep.url')).toThrowError('already loading')
  });

  test('loaded must be called after', () => {
    const register = new LoadedModelRegister();

    expect(() => register.loaded('jeep', 'jeep.model')).toThrowError('called first')
  });

  test('isEmpty returns true if empty, false otherwise', () => {
    const register = new LoadedModelRegister();

    expect(register.isEmpty()).toBeTruthy();

    register.loading('jeep', 'jeep_multi.glb');
    register.loaded('jeep', 'foo');
    expect(register.isEmpty()).toBeFalsy();
  });

  test('isLoaded returns false while loading and true when loaded', () => {
    const register = new LoadedModelRegister();

    expect(register.isLoaded('jeep')).toBeFalsy();

    register.loading('jeep', 'jeep_multi.glb');
    expect(register.isLoaded('jeep')).toBeFalsy();

    register.loaded('jeep', 'fake_object');
    expect(register.isLoaded('jeep')).toBeTruthy();
  });

  test('isLoading returns true while loading and false when loaded', () => {
    const register = new LoadedModelRegister();

    expect(register.isLoading('jeep')).toBeFalsy();

    register.loading('jeep', 'jeep_multi.glb');
    expect(register.isLoading('jeep')).toBeTruthy();

    register.loaded('jeep', 'fake_object');
    expect(register.isLoading('jeep')).toBeFalsy();
  });

  // test('allLoaded returns true if all models loaded and false otherwise', () => {
  //   const register = new LoadedModelRegister();

  //   register.loading('jeep', 'jeel.glb')
    // register.loading('plane', 'plane.glb')

    // expect(register.allLoaded()).toBeFalsy()

    // register.loaded('plane')
    // expect(register.allLoaded()).toBeFalsy()

    // register.loaded('jeep', 'jeep.model')
    // expect(register.allLoaded()).toBeTruthy()
  // });
});
