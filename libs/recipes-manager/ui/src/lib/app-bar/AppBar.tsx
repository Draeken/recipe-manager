/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { palette, PaletteTheme, spacing, SpacingTheme, ThemeContext } from '../../theme';
import { CmpButton } from '../cmp-button/CmpButton';
import { Typography, TypographyProps } from '../typography/Typography';

export interface AppBarProps {
  name: string;
  actions?: React.ReactElement[];
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

const flexDivCss = css({
  display: 'flex',
});

const actionsCss = css({
  marginLeft: 'auto',
});

export const AppBar = React.forwardRef<HTMLDivElement, AppBarPropsExtended>(
  (props: AppBarPropsExtended, forwardedRef) => {
    const { name, actions, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(rootClass(theme), defaultHostProps);
    const hrCss = getHrCss(theme);
    const h3Props = TypographyProps({ scale: 'H3', theme });
    return (
      <div ref={forwardedRef} {...hostProps}>
        <div css={flexDivCss}>
          <h3 {...h3Props}>{name}</h3>
          <div css={actionsCss}>{actions}</div>
        </div>
        <hr css={hrCss} />
      </div>
    );
  }
);
