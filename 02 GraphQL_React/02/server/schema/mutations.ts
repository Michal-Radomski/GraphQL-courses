import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

import Song from "../models/Song";
import SongType from "./song_type";
import LyricType from "./lyric_type";
import Lyric from "../models/Lyric";

const mutations = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(_parentValue, { title }) {
        return new Song({ title }).save();
      },
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID },
      },
      resolve(_parentValue, { content, songId }) {
        return (Song as any).addLyric(songId, content);
      },
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue, { id }) {
        return (Lyric as any).like(id);
      },
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(_parentValue, { id }) {
        return Song.findByIdAndRemove(id);
      },
    },
  },
});

export default mutations;
