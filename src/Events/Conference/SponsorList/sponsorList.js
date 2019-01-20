import React from 'react';

class SponsorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <div className="row sponsors-section" key={i}>
          {this.renderRow(startIndex, endIndex, imgs)}
        </div>
      );
    });
  }

  renderRow(startIndex, endIndex, imgs) {
    return imgs.slice(startIndex, endIndex).map(e => (
      <div className="col-sm-6 col-lg-3 mb-2 sponsor" key={e.id}>
        <div
          className="hotel-room text-center notransition"
          style={{ background: 'transparent' }}
        >
          <div className="d-block mb-0 thumbnail notransition">
            <a href={e.website} target="_blank">
              <img src={e.logo} alt="" className="img-fluid notransition" />
            </a>
          </div>
        </div>
      </div>
    ));
  }

  renderAllImg(imgs) {
    if (imgs.length > 0) {
      if (imgs.length % 4 === 0) {
        return this.renderImg(imgs.length / 4, imgs);
      }
      return this.renderImg(imgs.length / 4 + 1, imgs);
    }
    return (
      <div className="col-12">
        <h5 className="text-center" style={{ fontFamily: 'Montserrat' }}>
          TEDxHCMUSSH được hỗ trợ tổ chức bởi những nhà tài trợ có tầm nhìn và quan tâm đến các vấn đề chung của cộng đồng
        </h5>
      </div>
    );
  }

  render() {
    return (
      <div className="site-section bg-light">
        <div className="container" ref={this.element}>
          <div className="row">
            <div className="col-sm-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5">Sponsors</h2>
            </div>
          </div>
          <div className="row">{this.renderAllImg(this.props.sponsors)}</div>
        </div>
      </div>
    );
  }
}

export default SponsorList;
