import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Pagination from 'react-paginating';
import VideoList from './VideoList/videoList';

class PostListandPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      path: '',
      videos: [],
      currentPage: this.getUserPath(window.location.href)
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('learnPosts/postList')
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
          this.setState(
            { posts: this.groupPost(posts), path: window.location.pathname },
            () => console.log(this.state.posts)
          );
        }
      });

    firebase
      .database()
      .ref('learnPosts')
      .on('value', snapshot => {
        const learnPostsObj = snapshot.val();
        if (learnPostsObj && learnPostsObj.videoList) {
          const videos = [];
          Object.keys(learnPostsObj.videoList).forEach(e => {
            const video = {
              id: e,
              title: learnPostsObj.videoList[e].title,
              link: learnPostsObj.videoList[e].link,
              by: learnPostsObj.videoList[e].by
            };
            videos.push(video);
          });
          this.setState({ videos }, () => console.log(this.state.videos));
        }
      });
  }

  getUserPath(href) {
    const n = href.lastIndexOf('/');
    const result = href.substring(n + 1);
    return isNaN(parseInt(result)) ? 1 : parseInt(result);
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

  handlePageChange = (page, e) => {
    this.setState({ currentPage: page }, () =>
      console.log(this.state.currentPage)
    );
  };

  renderItems(posts, currentPage) {
    if (posts !== undefined) {
      return (
        posts[0] &&
        posts[currentPage - 1].map(item => (
          <Link
            to={`/learn/?post=${item.id}`}
            className="col-md-12 col-lg-4 mb-2"
            key={item.id}
          >
            <div className="hotel-room text-center notransition">
              <div className="media-with-text">
                <div className="img-border-sm mb-4">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="img-fluid notransition"
                  />
                </div>
                <h2 className="heading mb-0">{item.title}</h2>
                <span
                  className="mb-3 d-block post-date"
                  style={{ paddingBottom: '12px' }}
                >
                  {item.datePosted} By {item.by}
                </span>
              </div>
            </div>
          </Link>
        ))
      );
    }
    return null;
  }

  render() {
    const { currentPage, posts } = this.state;
    const limit = 6;
    const pageCount = 6;
    const total = posts.length * limit;
    if (this.getUserPath(window.location.href) <= posts.length) {
      return (
        <div className="site-section">
          <div className="row" style={{ width: '100%', margin: '0' }}>
            <div className="col-sm-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
                Videos
              </h2>
            </div>
          </div>
          <div
            className="row"
            style={{ width: '100%', margin: '0', paddingBottom: '54px' }}
          >
            <VideoList videos={this.state.videos} />
          </div>
          <div className="row" style={{ width: '100%', margin: '0' }}>
            <div className="col-sm-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
                Our Posts
              </h2>
            </div>
          </div>
          <div className="row post-page">
            {this.renderItems(posts, currentPage)}
          </div>
          <Pagination
            total={total}
            limit={limit}
            pageCount={pageCount}
            currentPage={currentPage}
          >
            {({
              pages,
              currentPage,
              hasNextPage,
              hasPreviousPage,
              previousPage,
              nextPage,
              totalPages,
              getPageItemProps
            }) => (
              <div className="row mt-5" style={{ width: '100%' }}>
                <div className="col-md-12 text-center">
                  <div className="learn-pagination">
                    <Link to={`/learn/1`}>
                      <span
                        {...getPageItemProps({
                          pageValue: 1,
                          onPageChange: this.handlePageChange
                        })}
                      >
                        first
                      </span>
                    </Link>

                    {hasPreviousPage && (
                      <Link to={`/learn/${previousPage}`}>
                        <span
                          {...getPageItemProps({
                            pageValue: previousPage,
                            onPageChange: this.handlePageChange
                          })}
                        >
                          {'<'}
                        </span>
                      </Link>
                    )}

                    {pages.map((page, i) => {
                      let activePage = null;
                      if (currentPage === page) {
                        activePage = {
                          backgroundColor: '#f23a2e',
                          color: '#fff'
                        };
                      }
                      return (
                        <Link key={i} to={`/learn/${page}`}>
                          <span
                            {...getPageItemProps({
                              pageValue: page,
                              key: page,
                              style: activePage,
                              onPageChange: this.handlePageChange
                            })}
                          >
                            {page}
                          </span>
                        </Link>
                      );
                    })}

                    {hasNextPage && (
                      <Link to={`/learn/${nextPage}`}>
                        <span
                          {...getPageItemProps({
                            pageValue: nextPage,
                            onPageChange: this.handlePageChange
                          })}
                        >
                          {'>'}
                        </span>
                      </Link>
                    )}
                    <Link to={`/learn/${totalPages}`}>
                      <span
                        {...getPageItemProps({
                          pageValue: totalPages,
                          onPageChange: this.handlePageChange
                        })}
                      >
                        last
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </Pagination>
        </div>
      );
    }
    return (
      <div>
        <div className="row" style={{ width: '100%', margin: '0' }}>
          <div className="col-sm-6 mx-auto text-center mb-5 section-heading">
            <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
              Videos
            </h2>
          </div>
        </div>
        <div
          className="row"
          style={{ width: '100%', margin: '0', paddingBottom: '54px' }}
        >
          <VideoList videos={this.state.videos} />
        </div>
        <div className="row" style={{ width: '100%', margin: '0' }}>
          <div className="col-sm-6 mx-auto text-center mb-5 section-heading">
            <h2 className="mb-5" style={{ fontFamily: 'Roboto' }}>
              Our Posts
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default PostListandPage;
