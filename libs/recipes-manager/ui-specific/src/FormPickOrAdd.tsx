import { CmpButton, FormPicker, FormText } from '@recipes-manager/ui';
import { fetcher, useDebounce } from '@recipes-manager/util';
import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

export interface Language {
  value: string;
  label: string;
}

export interface ValueLabel {
  value: string;
  label: string;
}

export interface FormLanguageProps {
  valueLabel?: ValueLabel;
  onChange: (vl: ValueLabel) => void;
}

export interface ValueLabelForm {
  value?: string;
  label: string;
}

export const FormPickerSuggest = ({
  label,
  onChange,
}: {
  label?: string;
  onChange: (vl: ValueLabelForm) => void;
}) => {
  const [internalVal, setInternalVal] = useState(label || '');
  const debouncedVal = useDebounce(internalVal, 500);
  const { data: options } = useSWR<ValueLabelForm[]>(
    () => (debouncedVal !== label ? '/api/languages' : null),
    fetcher
  );

  useEffect(() => {
    setInternalVal(label || '');
  }, [label]);

  const onPickerChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setInternalVal(val);
  };

  const onBlur = () => {
    if (internalVal === label) {
      return;
    }
    const valueLabel = (options || []).find((o) => o.label === internalVal);
    onChange({ label: internalVal, value: valueLabel?.value });
  };

  return (
    <FormPicker
      value={internalVal}
      onChange={onPickerChange}
      onBlur={onBlur}
      placeholder="language"
      required
      options={options?.map((o) => o.label) || []}
      listId="language"
    />
  );
};

export const FormLanguagePicker = ({ valueLabel, onChange }: FormLanguageProps) => {
  const [expanded, setExpanded] = useState(true);
  const onMainPickerChange = useCallback(
    ({ label, value }: ValueLabelForm) => {
      if (value) {
        setExpanded(false);
        onChange({ label, value });
      } else {
        setExpanded(true);
      }
    },
    [onChange]
  );
  const onConfirm = () => {
    fetcher('/api/language').then((valueLabel) => onChange(valueLabel));
  };
  return (
    <fieldset>
      <FormPickerSuggest onChange={onMainPickerChange} label={valueLabel?.label} />
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
