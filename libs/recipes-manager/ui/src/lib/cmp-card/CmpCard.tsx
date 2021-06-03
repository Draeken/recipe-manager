/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import {
  palette,
  paletteSurface,
  PaletteTheme,
  spacing,
  SpacingTheme,
  ThemeContext,
} from '../../theme';

export interface CmpCardProps {
  inlineBorder?: boolean;
}

type CmpCardPropsExtended = CmpCardProps & React.ComponentPropsWithRef<'div'>;

export interface CmpCardTheme {
  cmpCard: {
    padding: number;
    backgroundColor: string;
    borderColor: string;
    color: string;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette, spacing } as PaletteTheme & SpacingTheme, theme),
  (theme: PaletteTheme & SpacingTheme) =>
    merge(
      {
        cmpCard: {
          padding: theme.spacing.mainPadding,
          backgroundColor: theme.palette.surface.main,
          borderColor: theme.palette.divider,
          color: theme.palette.surface.on,
        },
      } as CmpCardTheme,
      theme
    )
);

const rootClass = ({ cmpCard }: CmpCardTheme, inlineBorder: boolean) => {
  const base = css({
    padding: cmpCard.padding,
    backgroundColor: cmpCard.backgroundColor,
    color: cmpCard.color,
    ...(inlineBorder && { borderInline: `1px solid ${cmpCard.borderColor}` }),
  });
  return { css: base };
};

export const CmpCard = React.forwardRef<HTMLDivElement, CmpCardPropsExtended>(
  (props: CmpCardPropsExtended, forwardedRef) => {
    const { children, ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const inlineBorder = props?.inlineBorder;
    const hostProps = mergeProps(rootClass(theme, inlineBorder), defaultHostProps);
    return (
      <div ref={forwardedRef} {...hostProps}>
        {children}
      </div>
    );
  }
);
