/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { paletteSurface, PaletteTheme, ThemeContext } from '../../theme';

export interface CmpCardProps {}

type CmpCardPropsExtended = CmpCardProps & React.ComponentPropsWithRef<'div'>;

export interface CmpCardTheme {
  cmpCard: {
    padding: number;
    backgroundColor: string;
    color: string;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette: { surface: paletteSurface } } as PaletteTheme, theme),
  (theme: PaletteTheme) =>
    merge(
      {
        cmpCard: {
          padding: 16,
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.surface.on,
        },
      } as CmpCardTheme,
      theme
    )
);

const rootClass = ({ cmpCard }: CmpCardTheme) => {
  const base = css({
    padding: cmpCard.padding,
    backgroundColor: cmpCard.backgroundColor,
    color: cmpCard.color,
  });
  return { css: base };
};

export const CmpCard = React.forwardRef<HTMLDivElement, CmpCardPropsExtended>(
  (props: CmpCardPropsExtended, forwardedRef) => {
    const { children, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(rootClass(theme), defaultHostProps);
    return (
      <div ref={forwardedRef} {...hostProps}>
        {children}
      </div>
    );
  }
);
