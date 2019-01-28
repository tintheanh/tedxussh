import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './linkSection.module.css';

const LinkSection = props => {
  const { cover, title, description, to } = props;
  return (
    <div className="col-md-12 col-lg-4 mb-2">
      <div className={styles.linkSection}>
        <div className={styles.thumbnail}>
          <Link to={to}>
            <img src={cover} alt="cover" className="img-fluid" />

            <div className="my-overlay text-vertical-center">
              <span className={styles.title}>
                {title}
                <br />
                <span className={styles.description}>{description}</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

LinkSection.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default LinkSection;
