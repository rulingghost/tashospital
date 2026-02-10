import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState } from 'react';

export default function CustomCombobox({ customers, value, onChange, placeholder = 'Select a customer' }) {
  const [query, setQuery] = useState('');
  console.log(customers);
  

  const selectedCustomer = customers.find((customer) => customer.id === value) || null;
  
  
  const filteredCustomers =
    query === ''
      ? customers
      : customers.filter((customer) => customer.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative w-full">
      <Combobox
        value={selectedCustomer}
        onChange={(customer) => {
          onChange(customer ? customer.id : "");
        }}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full mt-1 rounded-md  border border-gray-200 bg-white pr-8 pl-3 sm:text-sm px-3 py-2 text-gray-900',
              'focus:outline-none focus:ring-cyan-500 focus:border-cyan-500'
            )}
            displayValue={(customer) => customer?.name || ''}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          </ComboboxButton>
        </div>

        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredCustomers.length === 0 ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              No customers found.
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <ComboboxOption
                key={customer.id}
                value={customer}
                className={({ active }) =>
                  clsx(
                    'relative cursor-default select-none py-2 pl-4 pr-4 flex items-center gap-3',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="h-8 w-8 rounded-full border border-gray-300 object-cover"
                />
                <span className="block truncate">{customer.name}</span>
                {({ selected, active }) =>
                  selected ? (
                    <span
                      className={clsx(
                        'absolute inset-y-0 left-0 flex items-center pl-3',
                        active ? 'text-white' : 'text-indigo-600'
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null
                }
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}
