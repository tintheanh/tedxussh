import React from 'react';
import { getDataRealtime } from '../../../../config/firebase';
import UpdateLeftLinks from './updateLeftLinks';
import UpdateMiddleSentence from './updateMiddleSentence';
import UpdateRightSentence from './updateRightSentence';

class FooterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      footer: null
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    getDataRealtime('footer', doc => {
      if (doc.exists) {
        const footerObj = doc.data();
        this.setState({ footer: footerObj });
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
    if (this.state.footer !== null) {
      const { footer } = this.state;
      return (
        <div
          className="page-wrapper"
          style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}
        >
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h2 className="page-title">Footer Edit Section</h2>
              </div>
            </div>
            <UpdateLeftLinks data={footer.left.links} />
            <UpdateMiddleSentence
              data={{
                copyright: footer.copyright,
                sentence: footer.middle.sentence
              }}
            />
            <UpdateRightSentence data={footer.right.sentence} />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default FooterSection;
