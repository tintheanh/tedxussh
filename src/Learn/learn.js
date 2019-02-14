import React from 'react';
import { createBrowserHistory } from 'history';
import FullPost from '../FullPost/fullPost';
import PostsAndVideos from './PostsAndVideos/postsAndVideos';
import { getData } from '../config/firebase';
import { modifyObj } from '../config/functions';

const history = createBrowserHistory();

class Learn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: '',
      title: ''
    };
  }

  componentDidMount() {
    window.document.title = 'TEDxHCMUSSH - Learn';
    // firebase
    //   .database()
    //   .ref('learnPosts')
    //   .on('value', snapshot => {
    //     const learnPostsObj = snapshot.val();
    //     if (learnPostsObj) {
    //       this.setState({
    //         cover: learnPostsObj.cover,
    //         title: learnPostsObj.title
    //       });
    //     }
    //   });

    getData('learn').then(doc => {
      if (doc.exists) {
        this.setState({
          cover: doc.data().cover,
          title: doc.data().title
        });
      }
    });
  }

  processUrl(href) {
    let result = '';
    if (!href.includes('fbclid')) {
      const n = href.lastIndexOf('/');
      result = href.substring(n + 1);
      return result;
    }

    const n = href.lastIndexOf('/');
    let temp = href.substring(n + 1);
    temp = temp.split('fbclid');
    result = temp[0].substring(0, temp[0].length - 1);
    return result;
  }

  manualRouter() {
    const { href } = window.location;
    if (href.includes('learn') && !href.includes('post'))
      return <PostsAndVideos isVN={this.props.isVN} />;
    if (this.processUrl(href).includes('post'))
      return (
        <FullPost
          history={history}
          postID={`${this.processUrl(window.location.href).slice(6)}`}
        />
      );
    return null;
  }

  render() {
    const { isVN } = this.props;
    const learn = modifyObj(isVN, this.state, 'learn');
    return (
      <div>
        <div
          className="learn-header text-vertical-center"
          style={{
            backgroundImage: `url(${learn.cover})`
          }}
        >
          <div className="row" style={{ width: '100%', margin: '0' }}>
            <div className="col-md-12">
              <h1 className="about-title">{learn.title}</h1>
            </div>
          </div>
        </div>
        {this.manualRouter()}
      </div>
    );
  }
}

export default Learn;
