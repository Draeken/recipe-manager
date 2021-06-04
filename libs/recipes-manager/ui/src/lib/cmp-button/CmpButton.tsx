/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { palette, PaletteTheme, spacing, SpacingTheme, ThemeContext } from '../../theme';
import { TypographyProps } from '../typography/Typography';

type ButtonEmphaze = 'low' | 'medium' | 'high';

export interface CmpButtonProps {
  emphaze?: ButtonEmphaze;
  label?: string;
  icon?: React.Component;
}

type CmpButtonPropsExtended = CmpButtonProps & React.ComponentPropsWithRef<'button'>;

export interface CmpButtonTheme {
  cmpButton: {
    shape: SerializedStyles;
    mediumShape: SerializedStyles;
    lowShape: SerializedStyles;
    highShape: SerializedStyles;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette, spacing } as PaletteTheme & SpacingTheme, theme),
  (theme: PaletteTheme & SpacingTheme) =>
    merge(
      {
        cmpButton: {
          shape: css({
            padding: `0 ${theme.spacing.mainPadding}px`,
            height: 36,
            minWidth: 64,
            color: theme.palette.secondary.main,
          }),
          highShape: css({
            color: theme.palette.secondary.on,
            backgroundColor: theme.palette.secondary.main,
          }),
          mediumShape: css({
            color: theme.palette.surface.on,
            border: `1px solid ${theme.palette.divider}`,
          }),
          lowShape: css({
            padding: `0 ${theme.spacing.lowPadding}px`,
          }),
        },
      } as CmpButtonTheme,
      theme
    )
);

const buttonBaseCss = css({
  background: 'none',
  cursor: 'pointer',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  userSelect: 'none',
  textAlign: 'center',

  '&:active': {
    transform: 'scale(1.05)',
  },
});

const rootClass = ({ cmpButton }: CmpButtonTheme, emphaze: ButtonEmphaze = 'medium') => {
  const base = [buttonBaseCss, cmpButton.shape];
  switch (emphaze) {
    case 'high':
      return { css: css([...base, cmpButton.highShape]) };
    case 'medium':
      return { css: css([...base, cmpButton.mediumShape]) };
    case 'low':
      return { css: css([...base, cmpButton.lowShape]) };
    default:
      return { css: css(base) };
  }
};

export const CmpButton = React.forwardRef<HTMLButtonElement, CmpButtonPropsExtended>(
  (props: CmpButtonPropsExtended, forwardedRef) => {
    const { emphaze, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(
      rootClass(theme, emphaze),
      TypographyProps({ theme, scale: 'Button' }),
      defaultHostProps
    );
    return <button ref={forwardedRef} {...hostProps}></button>;
  }
);
