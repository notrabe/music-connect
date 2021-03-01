import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileBands = ({
  bands: { name, genre, instruments, current, to, from },
}) => {
  return (
    <div>
      <h3 className="text-dark">{name}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
        {!to ? ' Now' : <Moment format="YYYY/MM/DD">to</Moment>}
      </p>
      <p>
        <strong>Genre: </strong> {genre}
      </p>
      <p>
        <strong>Instruments: </strong> {instruments}
      </p>
    </div>
  );
};

ProfileBands.propTypes = {
  bands: PropTypes.array.isRequired,
};

export default ProfileBands;
