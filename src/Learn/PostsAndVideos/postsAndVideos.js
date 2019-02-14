import React from 'react';
import VideoSection from './VideoSection/videoSection';
import PostSection from './PostSection/postSection';
import { getData, database } from '../../config/firebase';

class PostListAndPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postSection: {
        header: '',
        posts: []
      },
      videoSection: null
    };
  }

  componentDidMount() {
    getData('learn').then(doc => {
      if (doc.exists) {
        this.setState(prevState => ({
          postSection: {
            ...prevState.postSection,
            header: doc.data().postSection.header
          }
        }));
      }
    });

    database
      .collection('tedxhcmussh-data')
      .doc('learn')
      .collection('posts')
      .get()
      .then(querySnapshot => {
        const posts = [];
        querySnapshot.forEach(doc => {
          const postObj = doc.data();
          const post = {
            id: doc.id,
            by: postObj.by,
            content: postObj.content,
            datePosted: postObj.datePosted,
            description: postObj.description,
            thumbnail: postObj.thumbnail,
            title: postObj.title
          };
          posts.push(post);
        });
        this.setState(prevState => ({
          postSection: {
            ...prevState.postSection,
            posts: this.groupPost(posts)
          }
        }));
      });

    getData('learn').then(doc => {
      if (doc.exists) {
        this.setState({ videoSection: doc.data().videoSection });
      }
    });
  }

  groupPost(posts) {
    if (posts !== undefined) {
      const result = [];
      let group = [];
      for (let index = 0; index < posts.length; index++) {
        group.push(posts[index]);
        if ((index + 1) % 6 === 0 && index !== 0) {
          result.push(group);
          group = [];
        }
        if (index === posts.length - 1 && posts.length % 6 !== 0)
          result.push(group);
      }
      return result;
    }
    return null;
  }

  render() {
    const { isVN } = this.props;
    const { postSection, videoSection } = this.state;
    return (
      <div className="site-section">
        <div className="container">
          {this.state.videoSection !== null ? (
            <VideoSection isVN={isVN} videoSection={videoSection} />
          ) : null}
          <PostSection isVN={isVN} postSection={postSection} />
        </div>
      </div>
    );
  }
}

export default PostListAndPage;
