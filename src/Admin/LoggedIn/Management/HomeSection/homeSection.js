import React from 'react';
import { getDataRealtime } from '../../../../config/firebase';

import UpdateTitle from './updateTitle';
import UpdateBackground from './updateBackground';
import UpdateDescription from './updateDescription';
import UpdateLeftTitle from './LeftUpdate/updateLeftTitle';
import UpdateLeftDescription from './LeftUpdate/updateLeftDescription';
import UpdateLeftCover from './LeftUpdate/updateLeftCover';
import UpdateMiddleTitle from './MiddleUpdate/updateMiddleTitle';
import UpdateMiddleDescription from './MiddleUpdate/updateMiddleDescription';
import UpdateMiddleCover from './MiddleUpdate/updateMiddleCover';
import UpdateRightTitle from './RightUpdate/updateRightTitle';
import UpdateRightDescription from './RightUpdate/updateRightDescription';
import UpdateRightCover from './RightUpdate/updateRightCover';

class HomeSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      home: null
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    getDataRealtime('home', doc => {
      if (doc.exists) {
        const homeObj = doc.data();
        this.setState({ home: homeObj });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  render() {
    if (this.state.home !== null) {
      const { home } = this.state;
      return (
        <div
          className="page-wrapper"
          style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}
        >
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h2 className="page-title">Home Edit Section</h2>
              </div>
            </div>
            <div>
              <UpdateBackground background={home.background} />
              <UpdateTitle title={home.title} />
              <UpdateDescription description={home.description} />
              <div className="row style-section">
                <div className="col-12">
                  <h3>Left</h3>
                </div>
                <div className="col-12">
                  <h5>Title</h5>
                </div>
                <UpdateLeftTitle title={home.left.title} />
                <div className="col-12">
                  <h5>Description</h5>
                </div>
                <UpdateLeftDescription description={home.left.description} />
                <UpdateLeftCover cover={home.left.cover} />
              </div>
              <div className="row style-section">
                <div className="col-12">
                  <h3>Middle</h3>
                </div>
                <div className="col-12">
                  <h5>Title</h5>
                </div>
                <UpdateMiddleTitle title={home.middle.title} />
                <div className="col-12">
                  <h5>Description</h5>
                </div>
                <UpdateMiddleDescription
                  description={home.middle.description}
                />
                <UpdateMiddleCover cover={home.middle.cover} />
              </div>
              <div
                className="row style-section"
                style={{ marginBottom: '54px' }}
              >
                <div className="col-12">
                  <h3>Right</h3>
                </div>
                <UpdateRightTitle title={home.right.title} />
                <div className="col-12">
                  <h5>Description</h5>
                </div>
                <UpdateRightDescription description={home.right.description} />
                <UpdateRightCover cover={home.right.cover} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default HomeSection;
