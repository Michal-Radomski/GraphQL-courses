import mongoose, { Schema, Document } from "mongoose";

interface ISong extends Document {
  title: string;
  user: Schema.Types.ObjectId;
  lyrics: [Schema.Types.ObjectId];
}

const songSchema: Schema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  lyrics: [
    {
      type: Schema.Types.ObjectId,
      ref: "lyric",
    },
  ],
});

songSchema.statics.addLyric = function (id: string, content: string) {
  const Lyric = mongoose.model("lyric");

  return this.findById(id).then((song: ISong) => {
    const lyric = new Lyric({ content, song });
    song.lyrics.push(lyric);
    return Promise.all([lyric.save(), song.save()]).then(([_lyric, song]) => song);
  });
};

songSchema.statics.findLyrics = function (id: string) {
  return this.findById(id)
    .populate("lyrics")
    .then((song: ISong) => song.lyrics);
};

export default mongoose.model<ISong>("song", songSchema);
