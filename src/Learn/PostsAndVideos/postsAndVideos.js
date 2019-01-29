import React from 'react';
import VideoSection from './VideoSection/videoSection';
import PostSection from './PostSection/postSection';
import { getData } from '../../config/firebase';

class PostListAndPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postSection: {
        header: '',
        posts: []
      },
      videoSection: {
        header: '',
        videos: []
      }
    };
  }

  componentDidMount() {
    getData('learnPosts/postSection', data => {
      const learnPostsObj = data.val();
      if (learnPostsObj) {
        const posts = [];
        Object.keys(learnPostsObj.postList).forEach(e => {
          const post = {
            id: e,
            title: learnPostsObj.postList[e].title,
            by: learnPostsObj.postList[e].by,
            description: learnPostsObj.postList[e].description,
            content: learnPostsObj.postList[e].content,
            datePosted: learnPostsObj.postList[e].datePosted,
            thumbnail: learnPostsObj.postList[e].thumbnail
          };
          posts.push(post);
        });
        this.setState(prevState => ({
          postSection: {
            ...prevState.postSection,
            header: learnPostsObj.header,
            posts: this.groupPost(posts)
          }
        }));
      }
    });

    getData('learnPosts/videoSection', data => {
      const videoObj = data.val();
      if (videoObj) {
        const videos = [];
        Object.keys(videoObj.videoList).forEach(e => {
          const video = {
            id: e,
            title: videoObj.videoList[e].title,
            link: videoObj.videoList[e].link,
            by: videoObj.videoList[e].by
          };
          videos.push(video);
        });
        this.setState(prevState => ({
          videoSection: {
            ...prevState.videoSection,
            header: videoObj.header,
            left: videoObj.left,
            videos
          }
        }));
      }
    });

    getData('learnPosts/videoSection/left', data => {
      const learnPostsObj = data.val();
      if (learnPostsObj) {
        this.setState({ left: learnPostsObj });
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
          <VideoSection isVN={isVN} videoSection={videoSection} />
          <PostSection isVN={isVN} postSection={postSection} />
        </div>
      </div>
    );
  }
}

export default PostListAndPage;
