/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { merge, mergeProps, pipe } from '@recipes-manager/util';
import React from 'react';
import { ThemeContext } from '../../theme';
import { FormText } from '../form-text/FormText';

export interface FormPickerProps {
  listId: string;
  options: string[];
}

type FormPickerPropsExtended = FormPickerProps & React.ComponentPropsWithRef<typeof FormText>;

export interface FormPickerTheme {
  formPicker: {};
}

const defaultTheme = pipe((theme: any) =>
  merge(
    {
      formPicker: {},
    } as FormPickerTheme,
    theme
  )
);

const rootClass = ({ formPicker }: FormPickerTheme) => {
  const base = css({});
  return { css: base };
};

export const FormPicker = (props: FormPickerPropsExtended) => {
  const { listId, options, ref: forwardedRef, ...defaultHostProps } = props;
  const theme = defaultTheme(React.useContext(ThemeContext));
  const hostProps = mergeProps(rootClass(theme), defaultHostProps);
  return (
    <>
      <FormText ref={forwardedRef} list={listId} {...hostProps} />
      <datalist id={listId}>
        {options?.map((opt) => (
          <option key={opt} value={opt} />
        ))}
      </datalist>
    </>
  );
};
