import mongoose, { Schema, Document } from "mongoose";

interface ILyric extends Document {
  likes: number;
  content: string;
  song: Schema.Types.ObjectId;
}

const lyricSchema: Schema = new Schema({
  song: {
    type: Schema.Types.ObjectId,
    ref: "song",
  },
  likes: { type: Number, default: 0 },
  content: { type: String },
});

lyricSchema.statics.like = function (id: string) {
  const Lyric = mongoose.model("lyric");

  return Lyric.findById(id).then((lyric: ILyric) => {
    ++lyric.likes;
    return lyric.save();
  });
};

export default mongoose.model<ILyric>("lyric", lyricSchema);
