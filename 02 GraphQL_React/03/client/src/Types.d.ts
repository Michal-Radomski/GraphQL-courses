declare module "*.jpg" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const value: any;
  export = value;
}

declare module "*.module.css";
declare module "*.module.scss";

interface User {
  _typename: string;
  email: string;
  id: string;
}

interface Props {
  mutate?(arg0: { refetchQueries?: DocumentNode[]; variables?: { email: string; password: string } }): Promise<void>;
  data?: { loading: boolean; user: User };
  onSubmit({ email, password }: { email: string; password: string }): void;
}

interface State {
  email: string;
  password: string;
}
