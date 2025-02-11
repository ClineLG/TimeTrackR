export type TokenProps = { checkUser: () => string | undefined };

export type AuthProps = {
  login: (token: string) => void;
};
