export type UserType = {
  id: string;
  token: string;
  username: string;
};

export type UserProps = { user: UserType | null };

export type AuthProps = {
  login: (user: UserType) => void;
};
