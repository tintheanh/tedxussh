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
          'template_H4PLMkqb',
          submit,
          'user_8ap9pGXVd7RplukevbdIU'
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
            data-aos="fade"
            style={{
              backgroundImage: `url(${background})`
            }}
          />
        </div>

        <div className="site-section bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <h1 style={{ fontWeight: '300' }}>CONTACT US</h1>
                <p>{hqName}</p>
                <p>{hqAddress}</p>
                <p>{comment}</p>
              </div>
              <div className="col-md-6 col-lg-8">
                {!this.state.submitted ? (
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">Name</p>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <input
                          type="text"
                          className="contact-input"
                          onChange={e =>
                            this.setState({ fname: e.target.value }, () =>
                              console.log(this.state.fname)
                            )
                          }
                        />
                        <p style={{ fontSize: '12px' }}>First name</p>
                      </div>
                      <div className="col-md-12 col-lg-6">
                        <input
                          type="text"
                          className="contact-input"
                          onChange={e =>
                            this.setState({ lname: e.target.value }, () =>
                              console.log(this.state.lname)
                            )
                          }
                        />
                        <p style={{ fontSize: '12px' }}>Last name</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">Email</p>
                      </div>
                      <div className="col-12">
                        <input
                          type="email"
                          className="contact-input"
                          onChange={e =>
                            this.setState({ email: e.target.value }, () =>
                              console.log(this.state.email)
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">Reason for contacting</p>
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-1 radio-btn">
                            <input
                              type="radio"
                              name="reason"
                              value="Attending"
                              onChange={e =>
                                this.setState({ reason: e.target.value }, () =>
                                  console.log(this.state.reason)
                                )
                              }
                            />
                          </div>
                          <div className="col-11 radio-content">Attending</div>
                        </div>
                        <div className="row">
                          <div className="col-1 radio-btn">
                            <input
                              type="radio"
                              name="reason"
                              value="Partnering"
                              onChange={e =>
                                this.setState({ reason: e.target.value }, () =>
                                  console.log(this.state.reason)
                                )
                              }
                            />
                          </div>
                          <div className="col-11 radio-content">Partnering</div>
                        </div>
                        <div className="row">
                          <div className="col-1 radio-btn">
                            <input
                              type="radio"
                              name="reason"
                              value="Speaking"
                              onChange={e =>
                                this.setState({ reason: e.target.value }, () =>
                                  console.log(this.state.reason)
                                )
                              }
                            />
                          </div>
                          <div className="col-11 radio-content">Speaking</div>
                        </div>
                        <div className="row">
                          <div className="col-1 radio-btn">
                            <input
                              type="radio"
                              name="reason"
                              value="Volunteer"
                              onChange={e =>
                                this.setState({ reason: e.target.value }, () =>
                                  console.log(this.state.reason)
                                )
                              }
                            />
                          </div>
                          <div className="col-11 radio-content">Volunteer</div>
                        </div>
                        <div className="row">
                          <div className="col-1 radio-btn">
                            <input
                              type="radio"
                              name="reason"
                              value="Other"
                              onChange={e =>
                                this.setState({ reason: e.target.value }, () =>
                                  console.log(this.state.reason)
                                )
                              }
                            />
                          </div>
                          <div className="col-11 radio-content">Other</div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <p className="contact-header">Message</p>
                      </div>
                      <div className="col-12">
                        <textarea
                          className="contact-input-mes"
                          onChange={e =>
                            this.setState({ message: e.target.value }, () =>
                              console.log(this.state.message)
                            )
                          }
                        />
                      </div>
                      <div className="col-12">
                        <input
                          className="send-btn"
                          type="submit"
                          value="SEND"
                        />
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="row">
                    <div className="col-12">
                      <p>
                        Thank you for reaching out! We'll get back to you as
                        soon as possible.
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
