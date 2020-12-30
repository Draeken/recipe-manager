import { css } from '@emotion/react';

const layout = css`
  display: grid;
`;

const LayoutHorHMH = ({ children }) => {
  return <main css={layout}>{children}</main>;
};

export default LayoutHorHMH;
