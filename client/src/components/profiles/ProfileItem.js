import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    location,
    instruments,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="avatar" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {instruments.slice(0, 4).map((ins, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-music"></i>
            &nbsp;{ins}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
