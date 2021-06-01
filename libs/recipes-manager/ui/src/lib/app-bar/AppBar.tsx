/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { paletteSurface, PaletteTheme, ThemeContext } from '../../theme';
import { Typography } from '../typography/Typography';

export interface AppBarProps {
  name: string;
}

type AppBarPropsExtended = AppBarProps & React.ComponentPropsWithRef<'div'>;

export interface AppBarTheme {
  appBar: {
    height: number;
    backgroundColor: string;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette: { surface: paletteSurface } } as PaletteTheme, theme),
  (theme: PaletteTheme) =>
    merge(
      {
        appBar: {
          height: 58,
          backgroundColor: theme.palette.surface.main,
        },
      } as AppBarTheme,
      theme
    )
);

const rootClass = ({ appBar }: AppBarTheme) => {
  const base = css({
    height: appBar.height,
    backgroundColor: appBar.backgroundColor,
  });
  return { css: base };
};

export const AppBar = React.forwardRef<HTMLDivElement, AppBarPropsExtended>(
  (props: AppBarPropsExtended, forwardedRef) => {
    const { name, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(rootClass(theme), defaultHostProps);
    return (
      <div ref={forwardedRef} {...hostProps}>
        <Typography scale={'H3'}>{name}</Typography>
      </div>
    );
  }
);
