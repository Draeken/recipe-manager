import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { UiComponentGeneratorSchema } from './schema';

describe('draeken generator', () => {
  let appTree: Tree;
  const options: UiComponentGeneratorSchema = {
    name: 'test',
    project: 'draeken',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
