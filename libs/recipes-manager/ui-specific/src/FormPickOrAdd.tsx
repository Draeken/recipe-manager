import { fetcherGraphQL } from '@recipes-manager/data-auth';
import { CmpButton, FormPicker, FormText } from '@recipes-manager/ui';
import { useDebounce } from '@recipes-manager/util';
import React, { useCallback, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

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

export const FormPickerSuggest = ({ name, onChange }: FormPickerSuggest) => {
  const [internalVal, setInternalVal] = useState(name || '');

  // suggestion based on what user type
  const debouncedVal = useDebounce(internalVal, 500);
  const { data: options } = useSWR<ValueNameForm[]>(
    () => (debouncedVal !== name ? '{ languages { label, id }}' : null),
    fetcherGraphQL
  );

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

export const FormLanguagePicker = ({ value, onChange }: FormLanguageProps) => {
  const [expanded, setExpanded] = useState(true);
  const { data: name } = useSWR<string>( //would require catching and batching these requests from many inputs
    value ? `{ languages:${value} { label }}` : null,
    fetcherGraphQL
  );
  const onMainPickerChange = useCallback(
    ({ name, value }: ValueNameForm) => {
      mutate(`{ languages:${value} { label }}`, name, false);
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
    fetcher('/api/language').then((valueLabel: ValueName) => {
      mutate(`{ languages:${valueLabel.value} { label }}`, valueLabel.name, false);
      onChange(valueLabel.value);
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
