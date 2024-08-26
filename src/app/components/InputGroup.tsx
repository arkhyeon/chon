import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useState,
  SelectHTMLAttributes,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

interface InputProps {
  name: string;
  errors?: string[];
}

const _Input = (
  {
    name,
    errors = [],
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        name={name}
        className="h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-black ring-2 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-orange-500"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
};

export const Input = forwardRef(_Input);

const useSearchHandler = (
  id: string,
  searchParams: URLSearchParams,
  pathname: string,
  replace: (url: string) => void,
  delay = 300,
) => {
  return useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set(id, term);
    } else {
      params.delete(id);
    }
    replace(`${pathname}?${params.toString()}`);
  }, delay);
};

// 기본 SearchInput 컴포넌트
const SearchInput = ({
  id,
  type = 'text',
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  if (!id) throw new Error('This component must have an id property');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useSearchHandler(id, searchParams, pathname, replace);

  return (
    <input
      id={id}
      className="w-full rounded-md border border-gray-200 bg-gray-50 px-2 py-[7.5px] outline-1 placeholder:text-gray-500"
      defaultValue={searchParams.get(id) || ''}
      onChange={(e) => handleSearch(e.target.value)}
      type={type}
      {...rest}
    />
  );
};

// TextInput 컴포넌트
export const TextInput = ({
  title,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <>
    {title && (
      <label htmlFor={props.id} className="min-w-[60px] text-black">
        {title}
      </label>
    )}
    <div className="relative flex flex-1 flex-shrink-0">
      <SearchInput {...props} />
    </div>
  </>
);

// DateRange 컴포넌트
export const DateRange = ({
  startDate,
  endDate,
  title,
}: {
  startDate: InputHTMLAttributes<HTMLInputElement>;
  endDate: InputHTMLAttributes<HTMLInputElement>;
  title: string;
}) => (
  <>
    {title && (
      <label htmlFor={startDate.id} className="min-w-[60px] text-black">
        {title}
      </label>
    )}
    <div className="relative flex flex-1 flex-shrink-0">
      <SearchInput {...startDate} type="date" />
    </div>
    <div className="relative flex flex-1 flex-shrink-0">
      <SearchInput {...endDate} type="date" />
    </div>
  </>
);

// SelectInput 컴포넌트
export const SelectInput = ({
  id,
  title,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) => {
  if (!id) throw new Error('This component must have an id property');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useSearchHandler(id, searchParams, pathname, replace);

  return (
    <>
      {title && (
        <label htmlFor={id} className="min-w-[60px] text-black">
          {title}
        </label>
      )}
      <div className="relative flex flex-1 flex-shrink-0 text-black">
        <select
          id={id}
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-2 py-[7.5px] outline-1"
          defaultValue={searchParams.get(id) || ''}
          onChange={(e) => handleSearch(e.target.value)}
          {...props}
        >
          {props.children}
        </select>
      </div>
    </>
  );
};
