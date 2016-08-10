import React, { PropTypes } from 'react';
import TopicTextInput from 'components/TopicTextInput';
import classNames from 'classnames/bind';
import styles from 'css/components/JobList';

const cx = classNames.bind(styles);

class PostBox extends React.Component {
  
  static propTypes = {
    posts: PropTypes.array
  }

  return (
    <div styleName="wrapper">
      {this.props.posts
        //.filter(item => item.start_date)
        .map(post => {
          return (
            <div key={post.id}>
              <h2 className="job--title">{post.title}</h2>
            </div>
          );
        })}
    </div>
  );
};

EntryBox.propTypes = {
  topic: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

export default PostBox;