type InputProps = {
  password?: boolean;
  placeholder: string;
  name: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  label: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({
  password,
  placeholder,
  name,
  setState,
  state,
  setError,
  label,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name} className=" text-sm font-medium text-gray-600">
        {label} :
      </label>
      <input
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
        type={password ? "password" : "text"}
        name={name}
        id={name}
        placeholder={placeholder}
        value={state}
        onChange={(event) => {
          setError("");

          setState(event.target.value);
        }}
      />
    </div>
  );
};
export default Input;
