import React from 'react';
import * as emailjs from 'emailjs-com';

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
    const { background, comment, hqAddress, hqName } = this.props.contact;
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
                <h1 className="about-title">Liên hệ chúng tôi</h1>
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
                        <p className="contact-header">Họ và tên</p>
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
                          Tên
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
                          Họ
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">Địa chỉ email</p>
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
                        <p className="contact-header">Lý do liên hệ</p>
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
                            Tham dự
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
                            Tài trợ
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
                            Trở thành cộng tác viên
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
                            Lý do khác
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">Lời nhắn</p>
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
                          value="GỬI"
                          style={{ fontFamily: 'Oswald' }}
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <p>
                        Cám ơn bạn vì đã liên hệ, chúng tôi sẽ hồi âm sớm nhất
                        có thể.
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
