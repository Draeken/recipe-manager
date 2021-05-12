import React from 'react';

import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface CreationProps {}

const StyledCreation = styled.div`
  color: pink;
`;

export function Creation(props: CreationProps) {
  return (
    <StyledCreation>
      <h1>Welcome to creation!</h1>
    </StyledCreation>
  );
}

export default Creation;
