import { render } from '@testing-library/react';

import RecipesManagerUi from './RecipesManagerUi';

describe('RecipesManagerUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipesManagerUi />);
    expect(baseElement).toBeTruthy();
  });
});
