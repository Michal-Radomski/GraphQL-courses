import React from "react";

class LyricList extends React.Component<Props, {}> {
  onLike(id: string) {
    console.log({ id });
  }

  renderLyrics() {
    return this.props.lyrics?.map(({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          {content} ({id})
          <i className="material-icons" onClick={() => this.onLike(id)}>
            thumb_up
          </i>
        </li>
      );
    });
  }

  render() {
    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

export default LyricList;
