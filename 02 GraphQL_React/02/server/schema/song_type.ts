import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from "graphql";

import Song from "../models/Song";
import LyricType from "./lyric_type";

const SongType: GraphQLObjectType = new GraphQLObjectType({
  name: "SongType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType as any),
      resolve(parentValue) {
        return (Song as any).findLyrics(parentValue.id);
      },
    },
  }),
}) as GraphQLObjectType;

export default SongType;
