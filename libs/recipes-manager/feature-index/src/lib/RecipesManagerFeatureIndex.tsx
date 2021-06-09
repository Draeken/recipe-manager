/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { AppBar, CmpCard, LayoutMain } from '@recipes-manager/ui';
import { AppProfile } from '@recipes-manager/ui-specific';
import React from 'react';

/* eslint-disable-next-line */
export interface RecipesManagerFeatureIndexProps {}

const formCss = css({
  display: 'grid',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(2, min-content)',
  gap: 16,
});

export function RecipesManagerFeatureIndex(props: RecipesManagerFeatureIndexProps) {
  return (
    <LayoutMain
      appBar={<AppBar name={'Recipes Manager'} actions={[<AppProfile />]} />}
      inlineStart={[]}
      main={<CmpCard inlineBorder></CmpCard>}
      inlineEnd={[]}
    />
  );
}

export default RecipesManagerFeatureIndex;
