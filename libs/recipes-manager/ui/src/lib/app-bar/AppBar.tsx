/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { palette, PaletteTheme, spacing, SpacingTheme, ThemeContext } from '../../theme';
import { Typography } from '../typography/Typography';

export interface AppBarProps {
  name: string;
}

type AppBarPropsExtended = AppBarProps & React.ComponentPropsWithRef<'div'>;

export interface AppBarTheme {
  appBar: {
    height: number;
    backgroundColor: string;
    color: string;
    separatorColor: string;
    paddingInline: number;
    paddingBlock: number;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette, spacing } as PaletteTheme & SpacingTheme, theme),
  (theme: PaletteTheme & SpacingTheme) =>
    merge(
      {
        appBar: {
          height: 58,
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.surface.on,
          separatorColor: theme.palette.divider,
          paddingInline: theme.spacing.outerRim,
          paddingBlock: 16,
        },
      } as AppBarTheme,
      theme
    )
);

const rootClass = ({ appBar }: AppBarTheme) => {
  const base = css({
    height: appBar.height,
    backgroundColor: appBar.backgroundColor,
    color: appBar.color,
    padding: `${appBar.paddingBlock}px ${appBar.paddingInline}px`,
  });
  return { css: base };
};

const getHrCss = ({ appBar }: AppBarTheme) => {
  const base = css({
    borderColor: appBar.separatorColor,
    borderStyle: 'solid',
  });
  return base;
};

export const AppBar = React.forwardRef<HTMLDivElement, AppBarPropsExtended>(
  (props: AppBarPropsExtended, forwardedRef) => {
    const { name, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(rootClass(theme), defaultHostProps);
    const hrCss = getHrCss(theme);
    return (
      <div ref={forwardedRef} {...hostProps}>
        <Typography scale={'H3'}>{name}</Typography>
        <hr css={hrCss} />
      </div>
    );
  }
);
