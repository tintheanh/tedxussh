import React from 'react';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Pagination from 'react-paginating';

class PostListandPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      path: '',
      currentPage: this.getUserPath(window.location.href)
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
          this.setState(
            { posts: this.groupPost(posts), path: window.location.pathname },
            () => console.log(this.state.posts)
          );
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
        if ((index + 1) % 3 === 0 && index !== 0) {
          result.push(group);
          group = [];
        }
        if (index === posts.length - 1 && posts.length % 3 !== 0)
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
            className="col-3"
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
                <span className="mb-3 d-block post-date">
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
    const limit = 3;
    const pageCount = 3;
    const total = posts.length * limit;
    if (this.getUserPath(window.location.href) <= posts.length) {
      return (
        <div class="site-section">
          {/* <div class="container">{this.renderAllImg(this.state.posts)}</div> */}
          <div className="row">{this.renderItems(posts, currentPage)}</div>
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
              <div>
                <button
                  {...getPageItemProps({
                    pageValue: 1,
                    onPageChange: this.handlePageChange
                  })}
                >
                  <Link to={`/learn/1`}>first</Link>
                </button>

                {hasPreviousPage && (
                  <button
                    {...getPageItemProps({
                      pageValue: previousPage,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    <Link to={`/learn/${previousPage}`}>{'<'}</Link>
                  </button>
                )}

                {pages.map(page => {
                  let activePage = null;
                  if (currentPage === page) {
                    activePage = { backgroundColor: '#fdce09' };
                  }
                  return (
                    <button
                      {...getPageItemProps({
                        pageValue: page,
                        key: page,
                        style: activePage,
                        onPageChange: this.handlePageChange
                      })}
                    >
                      <Link to={`/learn/${page}`}>{page}</Link>
                    </button>
                  );
                })}

                {hasNextPage && (
                  <button
                    {...getPageItemProps({
                      pageValue: nextPage,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    <Link to={`/learn/${nextPage}`}>{'>'}</Link>
                  </button>
                )}

                <button
                  {...getPageItemProps({
                    pageValue: totalPages,
                    onPageChange: this.handlePageChange
                  })}
                >
                  <Link to={`/learn/${totalPages}`}>last</Link>
                </button>
              </div>
            )}
          </Pagination>
        </div>
      );
    }
    return null;
  }
}

export default PostListandPage;
