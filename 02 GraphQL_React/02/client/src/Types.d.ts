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
  params: { id: string };
  data: { songs: Song[]; loading: boolean; refetch(): Function; song: Song };
  mutate(arg0: { variables: { title?: string; id?: string }; refetchQueries?: DocumentNode[] }): Promise<void>;
}

interface State {
  title: string;
}
