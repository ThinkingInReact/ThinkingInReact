import React, { Component } from 'react';
import TOCLink from 'components//TOCLink';

/**
 * It might feel like this be on the TOC component but
 * this component exists so we can easily get endless nesting by rendering TOCLinks in a TOCLink
 */
class TOCLinks extends Component {
  renderLinks() {
    let links = [];

    this.props.chapters.map((chapter) =>  {
      links.push(<TOCLink {...chapter} />)
    })

    return links;
  }

  render() {
    return (
      <ul className="TOCLinks">
        {this.renderLinks()}
      </ul>
    );
  }
}

export default TOCLinks;
