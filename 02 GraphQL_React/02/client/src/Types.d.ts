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
  lyrics: { id: string; content: string; likes: number }[];
  title: string;
  id: string;
  content: string;
}

interface Props {
  lyrics?: { id: string; content: string; likes: number }[];
  songId?: string;
  params?: { id: string };
  data?: { songs: Song[]; loading: boolean; refetch(): Function; song: Song };
  mutate?(arg0: {
    variables: { title?: string; id?: string; content?: string; songId?: string };
    refetchQueries?: DocumentNode[];
    optimisticResponse?: any;
  }): Promise<void>;
}

interface State {
  title?: string;
  content?: string;
}
