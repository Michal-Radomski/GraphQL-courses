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
}

interface State {
  title: string;
}
