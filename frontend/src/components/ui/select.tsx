/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';

const customStyles: StylesConfig<any, false> = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #4b5563',
    borderRadius: '0.375rem',
    backgroundColor: '#374151',
    padding: '0.2rem',
    color: '#ffffff',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#3b82f6',
    },
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 1px #3b82f6',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#ffffff',
  }),
  input: (provided) => ({
    ...provided,
    color: '#ffffff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151',
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: '#374151',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#3b82f6' : '#374151',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#3b82f6',
      color: '#ffffff',
    },
  }),
};

interface IOptions {
  value: string;
  label: string;
}

interface ISelect {
  label: string;
  options: IOptions[];
  value: IOptions | null;
  onChange: (value: IOptions | null) => void;
  error?: FieldError | null;
}

const SelectForm = forwardRef<HTMLSelectElement, ISelect>(
  ({ label, options, value, onChange, error }, ref) => {
    return (
      <div className="w-1/2">
        <label
          htmlFor={label}
          className="block mb-2 text-sm font-medium text-white"
        >
          {label}
        </label>
        <Select
          name={label}
          styles={customStyles}
          options={options}
          value={value}
          onChange={onChange}
        />

        {error && <span className="text-sm text-red-600">{error.message}</span>}
      </div>
    );
  }
);

export default SelectForm;
