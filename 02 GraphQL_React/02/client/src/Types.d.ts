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
  content: string;
}

interface Props {
  songId?: string;
  params?: { id: string };
  data?: { songs: Song[]; loading: boolean; refetch(): Function; song: Song };
  mutate?(arg0: {
    variables: { title?: string; id?: string; content?: string; songId?: string };
    refetchQueries?: DocumentNode[];
  }): Promise<void>;
}

interface State {
  title?: string;
  content?: string;
}
