import React from "react";

class LyricList extends React.Component<Props, {}> {
  renderLyrics() {
    return this.props.lyrics?.map(({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          {content} ({id})
        </li>
      );
    });
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

export default LyricList;
