import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import findChapter from 'lib//findChapter';
import PreviousIcon from 'icons//Previous';
import NextIcon from 'icons//Next';

class Footer extends Component {
  getChapterAndPagination() {
    const { toc, params } = this.props;
    let chapterParam = params.chapter;

    if(!chapterParam) {
      chapterParam = 'introduction';
    }

    let chapter = findChapter(toc, chapterParam).chapter;
    let subchapter, next, previous;

    if(params.subchapter) {
      subchapter = findChapter(chapter.sections, params.subchapter);
      next = chapter.sections[subchapter.index + 1];
      previous = chapter.sections[subchapter.index - 1];
    } else {
      next = toc[chapter.index + 1];
      previous = toc[chapter.index - 1];
    }

    return {
      chapter,
      next,
      previous
    };
  }

  render() {
    const { next, previous, chapter} = this.getChapterAndPagination();

    return (
      <footer>
        <div className="Pagination">
          {previous &&
            <div className="Previous">
              <div className="PreviousIcon">
                <PreviousIcon />
              </div>
              <Link className={cx('Previous', {'Previous--Disabled': !previous.finished, 'Previous--Finished': previous.finished, 'Previous--Preview': previous.preview})} to={url} activeClassName="active">{previous.title}</Link>
            </div>
          }

          {next &&
            <div className="Next">
              <div className="NextIcon">
                <NextIcon />
              </div>
              <Link className={cx('Next', {'Next--Disabled': !next.finished, 'Next--Finished': next.finished, 'Next--Preview': next.preview})} to={url} activeClassName="active">{next.title}</Link>
            </div>
          }
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    toc: state.toc
  }
}

export default connect(mapStateToProps)(Footer);
