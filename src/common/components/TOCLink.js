import React, { Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import TOCLinks from './TOCLinks';

class TOCLink extends Component {
  render() {
    const { sections, chapters, title, url, finished, preview } = this.props;

    return (
      <li>
        <Link className={cx('TOCLink', {'TOCLink--Disabled': !finished, 'TOCLink--Finished': finished, 'TOCLink--Preview': preview})} to={url} activeClassName="active">{title}</Link>
        {sections && <TOCLinks chapters={sections} />}
      </li>
    )
  }
}

export default TOCLink;
