import React from 'react';
import firebase from 'firebase';
import { getDataRealtime } from '../../../../config/firebase';

import UpdateBackground from './updateBackground';
import UpdateHeader from './updateHeader';
import UpdateLeftCover from './LeftUpdate/updateLeftCover';
import UpdateLeftTitle from './LeftUpdate/updateLeftTitle';
import UpdateLeftDescription from './LeftUpdate/updateLeftDescription';
import UpdateMiddleYT from './MiddleUpdate/UpdateMiddleYT';
import UpdateMiddleTitle from './MiddleUpdate/updateMiddleTitle';
import UpdateMiddleDescription from './MiddleUpdate/updateMiddleDescription';
import UpdateRightCover from './RightUpdate/updateRightCover';
import UpdateRightTitle from './RightUpdate/updateRightTitle';
import UpdateRightDescription from './RightUpdate/updateRightDescription';
import UpdateVision from './updateVision';

class AboutSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      about: null
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    getDataRealtime('about', doc => {
      if (doc.exists) {
        const aboutObj = doc.data();
        this.setState({ about: aboutObj });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
  }

  sortVisions(aboutObj) {
    const visionSort = [...aboutObj.visions];
    visionSort.sort((a, b) => a.order - b.order);
    return { ...aboutObj, visions: visionSort };
  }

  render() {
    if (this.state.about !== null) {
      const about = this.sortVisions(this.state.about);
      return (
        <div
          className="page-wrapper"
          style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}
        >
          <div className="page-breadcrumb" style={{ paddingBottom: '54px' }}>
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h2 className="page-title">About edit section</h2>
              </div>
            </div>
            <UpdateBackground background={about.background} />
            <UpdateHeader header={about.header} />
            <div className="row style-section">
              <div className="col-12">
                <h3>Left</h3>
              </div>
              <UpdateLeftCover picture={about.left.picture} />
              <UpdateLeftTitle title={about.left.title} />
              <UpdateLeftDescription description={about.left.description} />
            </div>
            <div className="row style-section">
              <div className="col-12">
                <h3>Middle</h3>
              </div>
              <UpdateMiddleYT video={about.middle.video} />
              <UpdateMiddleTitle title={about.middle.title} />
              <UpdateMiddleDescription description={about.middle.description} />
            </div>
            <div className="row style-section">
              <div className="col-12">
                <h3>Right</h3>
              </div>
              <UpdateRightCover picture={about.right.picture} />
              <UpdateRightTitle title={about.right.title} />
              <UpdateRightDescription description={about.right.description} />
            </div>
            <div className="row style-section">
              <div className="col-12">
                <h3>Vision</h3>
              </div>
              {about.visions.map((vision, i) => (
                <UpdateVision key={i} vision={vision} />
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default AboutSection;
