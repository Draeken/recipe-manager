import { css } from '@emotion/react';

const layout = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const AppLayout = ({ children }) => {
  return <div css={layout}>{children}</div>;
};

export default AppLayout;
