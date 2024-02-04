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

interface Props {
  data?: { songs: Song[]; loading: boolean; refetch(): Function; song: Song };
}

interface State {}
