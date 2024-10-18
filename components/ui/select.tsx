import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SelectContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string | undefined;
  handleValueChange: (newValue: string) => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

interface SelectProps {
  children: ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
}

export const Select: React.FC<SelectProps> = ({ children, onValueChange, value: propValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(propValue);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, value, handleValueChange }}>
      <div className="relative inline-block text-left w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {
  children: ReactNode;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children }) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectTrigger must be used within a Select');
  const { isOpen, setIsOpen } = context;

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
    >
      {children}
      <span className="ml-2 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    </button>
  );
};

interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectValue must be used within a Select');
  const { value } = context;
  return <span>{value || placeholder}</span>;
};

interface SelectContentProps {
  children: ReactNode;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectContent must be used within a Select');
  const { isOpen } = context;

  if (!isOpen) return null;

  return (
    <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
      <div className="py-1" role="menu" aria-orientation="vertical">
        {children}
      </div>
    </div>
  );
};

interface SelectItemProps {
  children: ReactNode;
  value: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({ children, value }) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectItem must be used within a Select');
  const { handleValueChange } = context;

  return (
    <div
      onClick={() => handleValueChange(value)}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
      role="menuitem"
    >
      {children}
    </div>
  );
};

export default Select;