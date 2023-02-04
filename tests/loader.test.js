import { ModelLoader } from 'examples/js/loader.js';


describe('Loader has method', () => {
  test('has returns false', () => {
    const loader = new ModelLoader();

    expect(loader.has('foo'), false);
  });
});
