import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import styles from './homeHeader.module.css';

const HomeHeader = props => {
  const { background, title, description, isVN } = props;
  return (
    <Parallax
      bgImage={background}
      strength={500}
      className={styles.homeParallax}
    >
      <div className="container" style={{ height: '100%' }}>
        <div className="row" style={{ height: '100%' }}>
          <div className={`col-lg-6 col-md-12 ${styles.homeTextWrapper}`}>
            <h1 className={styles.homeTitle}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <br />
            <Link to="/attend" className={styles.explore}>
              {isVN ? 'Khám phá sự kiện' : 'Explore the event'}
            </Link>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

HomeHeader.propTypes = {
  isVN: PropTypes.bool.isRequired,
  background: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default HomeHeader;
