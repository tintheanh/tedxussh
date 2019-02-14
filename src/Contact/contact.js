import React from 'react';
import * as emailjs from 'emailjs-com';
import { modifyObj } from '../config/functions';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      reason: '',
      message: '',

      submitted: false
    };
  }

  componentDidMount() {
    window.document.title = 'TEDxHCMUSSH - Contact';
  }

  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, reason, message } = this.state;
    if (
      fname !== '' &&
      lname !== '' &&
      email !== '' &&
      reason !== '' &&
      message !== ''
    ) {
      const submit = {
        fname: fname,
        lname: lname,
        email: email,
        reason: reason,
        message: message
      };
      emailjs
        .send(
          'sendgrid',
          'template_6iyB90g6',
          submit,
          'user_G4e0ygqPORINUBnCM5Idd'
        )
        .then(
          response => {
            console.log('SUCCESS!', response.status, response.text);
            this.setState({ submitted: true });
          },
          err => {
            console.log('FAILED...', err);
          }
        );
    } else alert('Please fill all the fields!');
  }

  render() {
    const { isVN } = this.props;
    const contact = modifyObj(isVN, this.props.contact, 'contact');
    const { background, comment, hqAddress, hqName } = contact;
    return (
      <div>
        <div>
          <div
            className="about-header text-vertical-center"
            style={{
              backgroundImage: `url(${background})`
            }}
          >
            <div className="row" style={{ width: '100%', margin: '0' }}>
              <div className="col-md-12">
                <h1 className="about-title">
                  {isVN ? 'Liên hệ chúng tôi' : 'Contact us'}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <p style={{ fontFamily: 'Montserrat' }}>{hqName}</p>
                <p style={{ fontFamily: 'Montserrat' }}>{hqAddress}</p>
                <p style={{ fontFamily: 'Montserrat' }}>{comment}</p>
              </div>
              <div className="col-md-6 col-lg-8">
                {!this.state.submitted ? (
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">
                          {isVN ? 'Họ và tên' : 'Name'}
                        </p>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <input
                          type="text"
                          className="contact-input"
                          onChange={e =>
                            this.setState({ fname: e.target.value })
                          }
                        />
                        <p
                          style={{ fontSize: '12px', fontFamily: 'Montserrat' }}
                        >
                          {isVN ? 'Tên' : 'First name'}
                        </p>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <input
                          type="text"
                          className="contact-input"
                          onChange={e =>
                            this.setState({ lname: e.target.value })
                          }
                        />
                        <p
                          style={{ fontSize: '12px', fontFamily: 'Montserrat' }}
                        >
                          {isVN ? 'Họ' : 'Last name'}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">
                          {isVN ? 'Địa chỉ email' : 'Email address'}
                        </p>
                      </div>
                      <div className="col-12">
                        <input
                          type="email"
                          className="contact-input"
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">
                          {isVN ? 'Lý do liên hệ' : 'Reason'}
                        </p>
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-1 radio-btn">
                            <input
                              type="radio"
                              name="reason"
                              value="Tham dự"
                              onChange={e =>
                                this.setState({ reason: e.target.value })
                              }
                            />
                          </div>
                          <div
                            className="col-11 radio-content"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {isVN ? 'Tham dự' : 'Attending'}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-1 radio-btn">
                            <input
                              type="radio"
                              name="reason"
                              value="Tài trợ"
                              onChange={e =>
                                this.setState({ reason: e.target.value })
                              }
                            />
                          </div>
                          <div
                            className="col-11 radio-content"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {isVN ? 'Tài trợ' : 'Sponsor'}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-1 radio-btn">
                            <input
                              type="radio"
                              name="reason"
                              value="Trở thành cộng tác viên"
                              onChange={e =>
                                this.setState({ reason: e.target.value })
                              }
                            />
                          </div>
                          <div
                            className="col-11 radio-content"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {isVN ? 'Trở thành cộng tác viên' : 'Partnership'}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-1 radio-btn">
                            <input
                              type="radio"
                              name="reason"
                              value="Lý do khác"
                              onChange={e =>
                                this.setState({ reason: e.target.value })
                              }
                            />
                          </div>
                          <div
                            className="col-11 radio-content"
                            style={{ fontFamily: 'Montserrat' }}
                          >
                            {isVN ? 'Lý do khác' : 'Other'}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">
                          {isVN ? 'Lời nhắn' : 'Message'}
                        </p>
                      </div>
                      <div className="col-12">
                        <textarea
                          className="contact-input-mes"
                          onChange={e =>
                            this.setState({ message: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-12">
                        <input
                          className="send-btn"
                          type="submit"
                          value={isVN ? 'Gửi' : 'Send'}
                          style={{ fontFamily: 'Oswald' }}
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <p>
                        {isVN
                          ? 'Cám ơn bạn vì đã liên hệ, chúng tôi sẽ hồi âm sớm nhất có thể.'
                          : 'Thank you for contacting us, we will get back to you as soon as possible'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
