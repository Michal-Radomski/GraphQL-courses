import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } from "graphql";

import Song from "../models/Song";
import SongType from "./song_type";
import LyricType from "./lyric_type";
import Lyric from "../models/Lyric";

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({});
      },
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_parentValue, { id }) {
        return Song.findById(id);
      },
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_parentValue, { id }) {
        return Lyric.findById(id);
      },
    },
  }),
});

export default RootQuery;
