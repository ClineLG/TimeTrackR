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
    <input
      className=""
      type={password ? "password" : "text"}
      name={name}
      placeholder={placeholder}
      value={state}
      onChange={(event) => {
        setError("");

        setState(event.target.value);
      }}
    />
  );
};
export default Input;
