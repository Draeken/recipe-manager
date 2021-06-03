import { AppBar, CmpCard, FormText, LayoutMain } from '@recipes-manager/ui';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

/* eslint-disable-next-line */
export interface RecipesManagerFeatureCreationProps {}

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

export function RecipesManagerFeatureCreation(props: RecipesManagerFeatureCreationProps) {
  const { control, register, handleSubmit, getValues, reset, setValue } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => console.log(data);
  return (
    <LayoutMain
      appBar={<AppBar name={'Recipe Creation'} />}
      inlineStart={[]}
      main={
        <CmpCard inlineBorder>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormText type="text" placeholder="Name" {...register('name', {})} />
            <FormText type="text" placeholder="Language" {...register('lang', {})} />
            <input type="text" placeholder="Family" {...register('Family', {})} />
            <input type="text" placeholder="Language" {...register('Language', {})} />
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