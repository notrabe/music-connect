import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBand } from '../../actions/profile';

const AddBand = ({ addBand, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    instruments: '',
    from: '',
    to: '',
    current: false,
    genre: '',
    bandcamp: '',
    soundcloud: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    name,
    instruments,
    from,
    to,
    current,
    genre,
    bandcamp,
    soundcloud,
  } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1 class="large text-primary">Add a Band</h1>
      <p class="lead">Add any band you have been in, past or present.</p>
      <small>* = required field</small>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addBand(formData, history);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            placeholder="* name"
            name="name"
            value={name}
            onChange={(e) => {
              onChange(e);
            }}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* instruments"
            name="instruments"
            value={instruments}
            onChange={(e) => {
              onChange(e);
            }}
            required
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Band
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => {
              onChange(e);
            }}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="genre"
            name="genre"
            value={genre}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="bandcamp"
            name="bandcamp"
            value={bandcamp}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="soundcloud"
            name="soundcloud"
            value={soundcloud}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </>
  );
};

AddBand.propTypes = {
  addBand: PropTypes.func.isRequired,
};

export default connect(null, { addBand })(AddBand);
