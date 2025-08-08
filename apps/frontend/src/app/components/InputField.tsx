interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder: string;
  required: boolean;
  errors: string[] | undefined;
}

export const InputField = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  errors,
}: InputFieldProps) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      {errors && <p className="mt-1 text-sm text-red-600">{errors}</p>}
    </div>
  );
};
