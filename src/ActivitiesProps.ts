export type ActivityProps = {
  setData: React.Dispatch<
    React.SetStateAction<
      | {
          x: string;
          y: number;
        }[]
      | undefined
    >
  >;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
