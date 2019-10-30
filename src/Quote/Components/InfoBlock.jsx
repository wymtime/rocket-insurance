import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
} from '@material-ui/core';

import styles from './InfoBlock.module.css';

const InfoBlock = ({ title, lines }) => (
  <div className={styles.infoBlock}>
    <Typography
      variant="subtitle1"
      align="left"
      gutterBottom
    >
      {title}
    </Typography>
    {lines.map((line) => (
      <Typography
        key={`key-${line}`}
        variant="subtitle2"
        align="left"
        gutterBottom
      >
        {line}
      </Typography>
    ))}
  </div>
);

InfoBlock.propTypes = {
  title: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InfoBlock;
