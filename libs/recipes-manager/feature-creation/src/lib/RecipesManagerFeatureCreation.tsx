/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { AppBar, CmpCard, FormPicker, FormText, LayoutMain } from '@recipes-manager/ui';
import { AppProfile } from '@recipes-manager/ui-specific';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

/* eslint-disable-next-line */
export interface RecipesManagerFeatureCreationProps {
  languages?: string[];
}

const FieldArray = ({ control, register, setValue, getValues }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'step',
  });

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input {...register(`step.${index}.name`)} />

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: 'append' });
          }}
        >
          append
        </button>
      </section>
    </>
  );
};

const formCss = css({
  display: 'grid',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(2, min-content)',
  gap: 16,
});

export function RecipesManagerFeatureCreation(props: RecipesManagerFeatureCreationProps) {
  const { control, register, handleSubmit, getValues, reset, setValue, watch } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => console.log('submit', data);
  const recipeName = watch('name');
  console.log('props', props);
  return (
    <LayoutMain
      appBar={
        <AppBar
          name={'Recipe Creation' + (recipeName ? `: ${recipeName}` : '')}
          actions={[<AppProfile key="profile" />]}
        />
      }
      inlineStart={[]}
      main={
        <CmpCard inlineBorder>
          <form css={formCss} onSubmit={handleSubmit(onSubmit)}>
            <FormText type="text" placeholder="Name" {...register('name', {})} />
            <FormPicker
              type="text"
              listId="languagesList"
              options={props.languages}
              placeholder="Language"
              {...register('lang', {})}
            />
            <input type="text" placeholder="Family" {...register('Family', {})} />
            <input type="number" placeholder="Serving" {...register('Serving', {})} />

            <FieldArray {...{ control, register, getValues, setValue }} />

            <button>add step</button>
            <input type="submit" />
          </form>
        </CmpCard>
      }
      inlineEnd={[]}
    />
  );
}

export default RecipesManagerFeatureCreation;
