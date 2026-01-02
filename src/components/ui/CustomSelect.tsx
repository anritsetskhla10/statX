import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

interface Option<T> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface CustomSelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  disabled?: boolean;
  placeholder?: string; 
  className?: string;   
}

export const CustomSelect = <T extends string | number>({ 
  value, 
  onChange, 
  options, 
  disabled,
  placeholder = "Select an option",
  className = "w-full" 
}: CustomSelectProps<T>) => {
  
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`${className} relative`}>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative mt-1">
          
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-input-bg py-3 pl-4 pr-10 text-left border border-border-color focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm hover:border-primary/50 transition-colors">
            <span className={`block truncate ${selectedOption ? 'text-text-main' : 'text-text-muted'}`}>
              {selectedOption?.label || placeholder}
            </span>
            
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-5 w-5 text-text-muted" aria-hidden="true" />
            </span>
          </Listbox.Button>
          
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-card-bg py-1 text-base shadow-xl ring-1 ring-black/5 focus:outline-none sm:text-sm z-50 border border-border-color custom-scrollbar">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2.5 pl-10 pr-4 ${
                      active ? 'bg-primary/10 text-primary' : 'text-text-main'
                    } ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`
                  }
                  value={option.value}
                  disabled={option.disabled}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium text-primary' : 'font-normal'}`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};