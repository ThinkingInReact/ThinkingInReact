import React, { Component } from 'react';
import { connect } from 'react-redux';
import TOCLinks from 'components//TOCLinks';

class TOC extends Component {
  render() {
    return (
      <div className="TOC">
        <TOCLinks chapters={this.props.chapters} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chapters: state.toc
  }
}

export default connect(mapStateToProps)(TOC);
