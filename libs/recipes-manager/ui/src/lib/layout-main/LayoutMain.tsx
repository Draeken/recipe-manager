/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { paletteSurface, PaletteTheme, ThemeContext } from '../../theme';

export interface LayoutMainProps {
  appBar: React.ReactElement;
  inlineStart: React.ReactElement[];
  main: React.ReactElement;
  inlineEnd: React.ReactElement[];
}

type LayoutMainPropsExtended = LayoutMainProps & React.ComponentPropsWithRef<'div'>;

export interface LayoutMainTheme {
  layoutMain: {
    padding: number;
    backgroundColor: string;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette: { surface: paletteSurface } } as PaletteTheme, theme),
  (theme: PaletteTheme) =>
    merge(
      {
        layoutMain: {
          padding: 16,
          backgroundColor: theme.palette.surface.background,
        },
      } as LayoutMainTheme,
      theme
    )
);

const rootClass = ({ layoutMain }: LayoutMainTheme) => {
  const base = css({
    backgroundColor: layoutMain.backgroundColor,
    minHeight: '100%',
  });
  return { css: base };
};

const getMainContainerCSS = ({ layoutMain }: LayoutMainTheme) => {
  const base = css({
    padding: layoutMain.padding,
  });
  return base;
};

export const LayoutMain = React.forwardRef<HTMLDivElement, LayoutMainPropsExtended>(
  (props: LayoutMainPropsExtended, forwardedRef) => {
    const { appBar, inlineStart, main, inlineEnd, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(rootClass(theme), defaultHostProps);
    const mainContainerCSS = getMainContainerCSS(theme);
    return (
      <div ref={forwardedRef} {...hostProps}>
        {appBar}
        <div css={mainContainerCSS}>
          <div>{inlineStart}</div>
          {main}
          <div>{inlineEnd}</div>
        </div>
      </div>
    );
  }
);
