import React from 'react';

const Footer = props => {
  if (props && props.left && props.middle && props.right) {
    const { links, playlist } = props.left;
    const { sentence } = props.middle;
    const { quote } = props.right;
    const { sourceQuote } = props.right;
    const { copyright } = props;
    console.log(copyright);
    return (
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <p className="text-center">
                <a href="" className="pb-1 pr-2 pl-0">
                  FAQs
                </a>
                <a href="#" className="p-2">
                  Organizers
                </a>
                <a href="#" className="p-2">
                  Get Event Updates
                </a>
                <a href={playlist} className="p-2" target="_blank">
                  Playlist
                </a>
                <a href="#" className="p-2">
                  Contact
                </a>
              </p>
              <p className="text-center">
                <a
                  href={links.facebook}
                  target="_blank"
                  className="pb-2 pr-2 pl-0"
                >
                  <span className="icon-facebook" />
                </a>
                <a href={links.twitter} target="_blank" className="p-2">
                  <span className="icon-twitter" />
                </a>
                <a href={links.instagram} target="_blank" className="p-2">
                  <span className="icon-instagram" />
                </a>
                <a href={links.linkedin} target="_blank" className="p-2">
                  <span className="icon-linkedin" />
                </a>
              </p>
            </div>
            <div className="col-md-4">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12 text-center">
                  <p>{sentence}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="col-md-12 text-center">
                <a href={sourceQuote} target="_blank">
                  <p>{quote}</p>
                </a>
              </div>
            </div>
          </div>
          <div className="row pt-5 mt-5 text-center">
            <div className="col-md-12">
              <p>
                Copyright &copy; {new Date().getFullYear()} {copyright}
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  } else return null;
};

export default Footer;
