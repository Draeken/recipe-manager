import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { CmpButton, FormPicker, FormText } from '@recipes-manager/ui';
import { useDebounce } from '@recipes-manager/util';
import React, { useCallback, useEffect, useState } from 'react';

export interface Language {
  value: string;
  label: string;
}

export interface ValueName {
  value: string;
  name: string;
}

export interface FormLanguageProps {
  value?: string;
  onChange: (value?: string) => void;
}

export interface ValueNameForm {
  value?: string;
  name: string;
}

interface FormPickerSuggest {
  name?: string;
  onChange: (vl: ValueNameForm) => void;
}

const GET_LANGUAUGES = gql`
  query GetLanguages {
    languages {
      id
      name
    }
  }
`;

export const FormPickerSuggest = ({ name, onChange }: FormPickerSuggest) => {
  const [internalVal, setInternalVal] = useState(name || '');
  const [getLanguages, { data: options }] = useLazyQuery<ValueNameForm[]>(GET_LANGUAUGES);

  // suggestion based on what user type
  const debouncedVal = useDebounce(internalVal, 500);
  useEffect(() => {
    if (debouncedVal === name) {
      return;
    }
    getLanguages();
  }, [getLanguages, debouncedVal, name]);

  useEffect(() => {
    setInternalVal(name || '');
  }, [name]);

  const onPickerChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setInternalVal(val);
  };

  const onBlur = () => {
    if (internalVal === name) {
      return;
    }
    const valueName = (options || []).find((o) => o.name === internalVal);
    onChange({ name: internalVal, value: valueName?.value });
  };

  return (
    <FormPicker
      value={internalVal}
      onChange={onPickerChange}
      onBlur={onBlur}
      placeholder="language"
      required
      options={options?.map((o) => o.name) || []} //option in datalist only have value, there can't be distinction between value/displayed name
      listId="language"
    />
  );
};

const GET_LANGUAGE_LABEL = gql`
  query Language($id: ID!) {
    language(id: $id) {
      label
    }
  }
`;

const ADD_LANGUAGE = gql`
  mutation AddLanguage($name: String!) {
    addLanguage($name)
  }
`;

export const FormLanguagePicker = ({ value, onChange }: FormLanguageProps) => {
  const [expanded, setExpanded] = useState(true);
  const [addLanguage] = useMutation(ADD_LANGUAGE, {
    update(cache, { data: { addLanguage } }) {
      cache.modify({
        fields: {
          languages(existingLanguages = []) {
            const newLanguageRef = cache.writeFragment({
              data: addLanguage.language,
              fragment: gql`
                fragment NewLanguage on Language {
                  id
                  name
                }
              `,
            });
            return [...existingLanguages, newLanguageRef];
          },
        },
      });
    },
  });

  //would require catching and batching these requests from many inputs
  const [getLanguageLabel, { data: name }] = useLazyQuery<string>(GET_LANGUAGE_LABEL);
  useEffect(() => {
    if (!value) {
      return;
    }
    getLanguageLabel({ variables: { id: value } });
  }, [getLanguageLabel, value]);

  const onMainPickerChange = useCallback(
    ({ value }: ValueNameForm) => {
      if (value) {
        setExpanded(false);
        onChange(value);
      } else {
        setExpanded(true);
      }
    },
    [onChange]
  );

  // proceed to class creation, retrieve class's ID (value)
  const onConfirm = () => {
    addLanguage({ variables: { name: 'user typed name from FormText' } }).then((value) => {
      onChange(value.data?.language?.id);
    });
  };
  return (
    <fieldset>
      <FormPickerSuggest onChange={onMainPickerChange} name={name} />
      {expanded && (
        <>
          <FormText required type="text" placeholder="short description" />
          <CmpButton onClick={onConfirm}>confirm</CmpButton>
          <span>All changes are final</span>
        </>
      )}
    </fieldset>
  );
};
