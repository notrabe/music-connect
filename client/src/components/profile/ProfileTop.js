import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({
  profile: {
    location,
    social,
    instruments,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img class="round-img my-1" src={avatar} alt="" />
      <h1 class="large">{name}</h1>
      <h1 class="large">{instruments.join(', ')}</h1>
      <p class="lead">{location && <span>{location}</span>}</p>
      <div class="icons my-1">
        {social && social.bandcamp && (
          <Link to="social.bandcamp" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-bandcamp fa-2x"></i>
          </Link>
        )}
        {social && social.soundcloud && (
          <Link
            to="social.soundcloud"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-soundcloud fa-2x"></i>
          </Link>
        )}
        {social && social.youtube && (
          <Link to="social.youtube" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-youtube fa-2x"></i>
          </Link>
        )}
        {social && social.facebook && (
          <Link to="social.facebook" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook fa-2x"></i>
          </Link>
        )}
        {social && social.twitter && (
          <Link to="social.twitter" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x"></i>
          </Link>
        )}
        {social && social.instagram && (
          <Link to="social.instagram" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram fa-2x"></i>
          </Link>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
