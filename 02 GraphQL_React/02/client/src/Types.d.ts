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

interface Song {
  title: string;
  id: string;
}

interface Props {
  data: { songs: Song[]; loading: boolean };
  mutate(arg0: { variables: { title: string }; refetchQueries: DocumentNode[] }): Promise<void>;
}

interface State {
  title: string;
}
