import React from "react";

import fetchOneSong from "../../queries/fetchOneSong";
console.log("fetchOneSong:", fetchOneSong, typeof fetchOneSong);

class SongDetails extends React.Component {
  render() {
    return (
      <div>
        <h3>Song Detail</h3>
      </div>
    );
  }
}

export default SongDetails;
