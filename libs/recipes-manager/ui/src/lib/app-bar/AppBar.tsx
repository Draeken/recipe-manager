/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { ThemeContext } from '../../theme';
import { Typography } from '../typography/Typography';

export interface AppBarProps {
  name: string;
}

type AppBarPropsExtended = AppBarProps & React.ComponentPropsWithRef<'div'>;

export interface AppBarTheme {
  appBar: {
    height: number;
  };
}

const defaultTheme = pipe((theme: any) =>
  merge(
    {
      appBar: {
        height: 58,
      },
    } as AppBarTheme,
    theme
  )
);

const rootClass = ({ appBar }: AppBarTheme) => {
  const base = css({
    height: appBar.height + 'px',
    backgroundColor: '#c3c3c3',
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
