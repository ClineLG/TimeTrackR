type InputProps = {
  password?: boolean;
  placeholder: string;
  name: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const Input = ({
  password,
  placeholder,
  name,
  setState,
  state,
  setError,
}: InputProps) => {
  return (
    <>
      {" "}
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {placeholder}
      </label>
      <input
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
    </>
  );
};
export default Input;
