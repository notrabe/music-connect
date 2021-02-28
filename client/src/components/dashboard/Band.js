import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteBand } from '../../actions/profile';

const Band = ({ band, deleteBand }) => {
  const bands = band.map((band) => (
    <tr key={band._id}>
      <td>{band.name}</td>
      <td className="hide-sm">{band.genre}</td>
      <td>
        <Moment format="YYYY/MM/DD">{band.from}</Moment> -{' '}
        {band.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{band.to}</Moment>
        )}
      </td>
      <td>
        <button onClick={() => deleteBand(band._id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">Bands</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="hide-sm">Genre</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{bands}</tbody>
      </table>
    </>
  );
};

Band.propTypes = {
  band: PropTypes.array.isRequired,
  deleteBand: PropTypes.func.isRequired,
};

export default connect(null, { deleteBand })(Band);
