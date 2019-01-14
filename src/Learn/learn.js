import React from 'react';

class Learn extends React.Component {
  render() {
    return (
      <div>
        <div
          className="site-blocks-cover overlay"
          data-aos="fade"
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-7">
                <h1 className="mb-1">Learn</h1>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div class="site-section">
          <div class="container">
            <div class="row">
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="media-with-text">
                  <div className="img-border-sm mb-4">
                    <img src="images/img_1.jpg" alt="" className="img-fluid" />
                  </div>
                  <h2 className="heading mb-0">Lorem Ipsum Dolor Sit Amet</h2>
                  <span className="mb-3 d-block post-date">
                    Dec 20th, 2018 &bullet; By Admin
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Optio dolores culpa qui aliquam placeat nobis veritatis
                    tempora natus rerum obcaecati.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Learn;
