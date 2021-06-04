/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { palette, PaletteTheme, ThemeContext } from '../../theme';

export interface CmpAvatarProps {}

type CmpAvatarPropsExtended = CmpAvatarProps & React.ComponentPropsWithRef<'img'>;

export interface CmpAvatarTheme {
  cmpAvatar: {
    borderColor: string;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette } as PaletteTheme, theme),
  (theme: PaletteTheme) =>
    merge(
      {
        cmpAvatar: {
          borderColor: theme.palette.divider,
        },
      } as CmpAvatarTheme,
      theme
    )
);

const rootClass = ({ cmpAvatar }: CmpAvatarTheme) => {
  const base = css({
    borderRadius: '50%',
    height: 53,
    width: 53,
    border: `1px solid ${cmpAvatar.borderColor}`,
    objectFit: 'cover',
  });
  return { css: base };
};

export const CmpAvatar = React.forwardRef<HTMLImageElement, CmpAvatarPropsExtended>(
  (props: CmpAvatarPropsExtended, forwardedRef) => {
    const { ...defaultHostProps } = props;
    const theme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(rootClass(theme), defaultHostProps);
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img ref={forwardedRef} {...hostProps}></img>;
  }
);
