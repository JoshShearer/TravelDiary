import React from 'react';
import classes from './Spinner.css'
import Spinner from 'react-bootstrap/Spinner';

    const LoadingSpinner = () => (
        <div className={classes.Loader}>Loading...... </div>
      //   <Spinner
      //   as="span"
      //   animation="border"
      //   size="sm"
      //   role="status"
      //   aria-hidden="true"
      // />
    );

    export default LoadingSpinner;