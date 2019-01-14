import React from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      path: ''
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('learnPosts')
      .on('value', snapshot => {
        const learnPostsObj = snapshot.val();
        if (learnPostsObj) {
          const posts = [];
          Object.keys(learnPostsObj).forEach(e => {
            const post = {
              id: e,
              title: learnPostsObj[e].title,
              by: learnPostsObj[e].by,
              content: learnPostsObj[e].content,
              datePosted: learnPostsObj[e].datePosted,
              thumbnail: learnPostsObj[e].thumbnail
            };
            posts.push(post);
          });
          this.setState({ posts, path: window.location.pathname }, () =>
            console.log(this.state.path)
          );
        }
      });
  }

  // getPostID(postID) {
  //   this.setState({ postID }, () => console.log(this.state.postID));
  // }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(e => (
      <Link to={`/admin/learn/?post=${e.id}`} className="col-3" key={e.id}>
        <div onClick={this.props.getPost.bind(this, e)}>
          <div className="hotel-room text-center notransition">
            <div className="media-with-text">
              <div className="img-border-sm mb-4">
                <img
                  src={e.thumbnail}
                  alt=""
                  className="img-fluid notransition"
                />
              </div>
              <h2 className="heading mb-0">{e.title}</h2>
              <span className="mb-3 d-block post-date">
                {e.datePosted} By {e.by}
              </span>
            </div>
          </div>
        </div>
      </Link>
    ));
  }

  renderImg(totalRows, imgs) {
    let startIndex = -4;
    let endIndex = startIndex + 4;
    const temp = Array.from({ length: totalRows }, () =>
      Math.floor(Math.random())
    );

    return temp.map((_, i) => {
      startIndex += 4;
      endIndex += 4;
      return (
        <div className="row" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      );
    });
  }

  renderAllImg(imgs) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs);
      }
      return this.renderImg(imgs.length / 4 + 1, imgs);
    }
    return <h2>No imgs available</h2>;
  }

  render() {
    return <div>{this.renderAllImg(this.state.posts)}</div>;
  }
}

export default PostList;
