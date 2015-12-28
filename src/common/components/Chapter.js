import React, { Component } from 'react'
import { connect } from 'react-redux';
import findChapter from 'lib//findChapter';

class Chapter extends Component {
  createContentMarkup() {
    return { __html: this.getChapter().content };
  }

  getChapter() {
    const { toc, params } = this.props;
    let chapterParam = params.chapter;

    if(!chapterParam) {
      chapterParam = 'introduction';
    }
    let chapter = findChapter(toc, chapterParam).chapter;

    if(params.subchapter) {
      chapter = findChapter(chapter.sections, params.subchapter).chapter;
    } else {
      chapter = chapter;
    }

    return chapter;
  }

  render() {
    return (
      <article className="Chapter">
        <div className="Content markdown-body" dangerouslySetInnerHTML={this.createContentMarkup()}>
        </div>
      </article>
    )
  }
}

function mapStateToProps(state) {
  return {
    toc: state.toc
  }
}

export default connect(mapStateToProps)(Chapter);
