import React from 'react';
import { getDataRealtime } from '../../../../config/firebase';

import UpdateBackground from './updateBackground';
import UpdateComment from './updateComment';
import UpdateEmail from './updateEmail';
import UpdateIntroduction from './UpdateIntroduction';

class ContactSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      contact: null
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    getDataRealtime('contact', doc => {
      if (doc.exists) {
        const contactObj = doc.data();
        this.setState({ contact: contactObj });
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
    if (this.state.contact !== null) {
      const { contact } = this.state;
      return (
        <div
          className="page-wrapper"
          style={{ height: `${this.state.height - 64}px`, overflowY: 'scroll' }}
        >
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h2 className="page-hqName">Contact Edit Section</h2>
              </div>
            </div>
            <div>
              <UpdateBackground background={contact.background} />
              <UpdateComment comment={contact.comment} />
              <UpdateEmail email={contact.hqAddress} />
              <UpdateIntroduction introduction={contact.hqName} />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default ContactSection;
