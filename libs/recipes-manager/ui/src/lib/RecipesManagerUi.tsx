import styled from '@emotion/styled';
import React from 'react';

/* eslint-disable-next-line */
export interface RecipesManagerUiProps {}

const StyledRecipesManagerUi = styled.div`
  color: pink;
`;

export function RecipesManagerUi(props: RecipesManagerUiProps) {
  return (
    <StyledRecipesManagerUi>
      <h1>Welcome to recipes-manager-ui!</h1>
    </StyledRecipesManagerUi>
  );
}

export default RecipesManagerUi;
