import { css } from '@emotion/react';

const layout = css`
  display: grid;
  flex: 1;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 100%;
`;

const LayoutHorHMH = ({ children }) => {
  return <main css={layout}>{children}</main>;
};

export default LayoutHorHMH;
