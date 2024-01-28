import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } from "graphql";

import Lyric from "../models/Lyric";
import SongType from "./song_type";

const LyricType: GraphQLObjectType = new GraphQLObjectType({
  name: "LyricType",
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: SongType,
      resolve(parentValue) {
        return Lyric.findById(parentValue)
          .populate("song")
          .then((lyric) => {
            console.log("lyric:", lyric);
            return lyric?.song;
          });
      },
    },
  }),
});

export default LyricType;
