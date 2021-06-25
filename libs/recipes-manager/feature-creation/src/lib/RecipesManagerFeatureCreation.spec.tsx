import { render, fireEvent, screen } from '@recipes-manager/util-test';

import RecipesManagerFeatureCreation from './RecipesManagerFeatureCreation';

describe('RecipesManagerFeatureCreation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <RecipesManagerFeatureCreation languages={['english', 'french']} />
    );
    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'Test' } });
    expect(baseElement).toBeTruthy();
  });
});
