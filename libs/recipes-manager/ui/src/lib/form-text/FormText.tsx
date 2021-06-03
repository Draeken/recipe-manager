/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { palettePrimary, PaletteTheme, ThemeContext } from '../../theme';
import { TypographyProps, TypographyScale } from '../typography/Typography';

export interface FormTextProps {}

type FormTextPropsExtended = FormTextProps & React.ComponentPropsWithRef<'input'>;

export interface FormTextTheme {
  formText: {
    labelScale?: keyof TypographyScale;
    inputScale?: keyof TypographyScale;
    labelColorFocused?: string;
    underlineColor?: string;
    underlineColorFocused?: string;
    topLabelSpace?: number;
  };
}

const defaultTheme = pipe(
  (theme: any) => merge({ palette: { primary: palettePrimary } } as PaletteTheme, theme),
  (theme: PaletteTheme) =>
    merge(
      {
        formText: {
          labelScale: 'Button',
          inputScale: 'Body1',
          labelColorFocused: theme.palette.primary.lightVariant,
          underlineColor: theme.palette.primary.main,
          underlineColorFocused: theme.palette.primary.lightVariant,
          topLabelSpace: 15,
        },
      } as FormTextTheme,
      theme
    )
);

const rootClass = ({ formText }: FormTextTheme) => {
  const base = css({
    position: 'relative',
    padding: `${formText.topLabelSpace}px 0 0`,
    display: 'inline-block',
  });
  return { css: base };
};

const inputClass = ({ formText }: FormTextTheme) => {
  console.log('inputclass theme', formText);
  const base = css({
    width: '100%',
    border: 0,
    borderBottom: `2px solid ${formText.underlineColor}`,
    outline: 0,
    color: 'inherit',
    padding: '7px 0',
    background: 'transparent',
    transition: 'border-color 0.2s',

    '&::placeholder': {
      color: 'transparent',
    },

    '&:placeholder-shown ~ label': {
      cursor: 'text',
      top: 20,
    },

    '&:focus': {
      '~ label': {
        position: 'absolute',
        top: 0,
        display: 'block',
        transition: '0.2s',
        fontSize: '1rem',
        color: formText.labelColorFocused,
        fontWeight: 700,
      },
      paddingBottom: 6,
      fontWeight: 700,
      borderWidth: 3,
      borderColor: formText.underlineColorFocused,
    },
  });
  return { css: base };
};

const labelClass = ({ formText }: FormTextTheme) => {
  const base = css({
    position: 'absolute',
    top: 0,
    display: 'block',
    transition: '0.2s',
    fontSize: '1rem',
    color: 'inherit',
  });
  return { css: base };
};

export const FormText = React.forwardRef<HTMLInputElement, FormTextPropsExtended>(
  (props: FormTextPropsExtended, forwardedRef) => {
    const { ...defaultHostProps } = props;
    const theme: FormTextTheme = defaultTheme(React.useContext(ThemeContext));
    const hostProps = mergeProps(rootClass(theme));
    const inputProps = mergeProps(
      inputClass(theme),
      TypographyProps({ scale: theme.formText.inputScale, theme }),
      defaultHostProps
    );
    const { name, placeholder } = defaultHostProps;
    const labelProps = mergeProps(
      labelClass(theme),
      TypographyProps({ scale: theme.formText.labelScale, theme })
    );
    return (
      <div {...hostProps}>
        <input id={name} type="input" ref={forwardedRef} {...inputProps} />
        <label htmlFor={name} {...labelProps}>
          {placeholder}
        </label>
      </div>
    );
  }
);
