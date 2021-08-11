import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { CmpButton, FormPicker, FormText } from '@recipes-manager/ui';
import { useDebounce } from '@recipes-manager/util';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface Language {
  id: string;
  name: string;
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
  const [getLanguages, { data, error }] = useLazyQuery<{ languages: Language[] }>(GET_LANGUAUGES);
  const options = data?.languages;
  if (error) {
    console.log('errors', error);
  }
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
    const valueName = (options || []).find((o) => o.name === internalVal);
    onChange({ name: internalVal, value: valueName?.id });
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
      name
    }
  }
`;

const ADD_LANGUAGE = gql`
  mutation AddLanguage($name: String!) {
    addLanguage(name: $name) {
      language {
        id
        name
      }
    }
  }
`;

export const FormLanguagePicker = ({ value, onChange }: FormLanguageProps) => {
  const [expanded, setExpanded] = useState(false);
  const newName = useRef<string>();
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
  const [getLanguageLabel, { data }] = useLazyQuery<{ language: { name: string } }>(
    GET_LANGUAGE_LABEL
  );
  useEffect(() => {
    if (!value) {
      return;
    }
    getLanguageLabel({ variables: { id: value } });
  }, [getLanguageLabel, value]);

  const onMainPickerChange = useCallback(
    ({ value, name }: ValueNameForm) => {
      newName.current = name;
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
    addLanguage({ variables: { name: newName.current } }).then((value) => {
      setExpanded(false);
      onChange(value.data?.language?.id);
    });
  };
  return (
    <fieldset>
      <FormPickerSuggest onChange={onMainPickerChange} name={data?.language?.name} />
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
