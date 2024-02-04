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
  mutate?({}): Promise<void>;
  data?: { loading: boolean; user: User };
}

interface State {}
