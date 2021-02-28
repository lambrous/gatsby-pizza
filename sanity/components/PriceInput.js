import React from 'react';
import PropTypes from 'prop-types';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import FormField from 'part:@sanity/components/formfields/default';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

const PriceInput = ({ type, value, onChange }) => (
  <FormField
    label={`${type.title} ${value ? `- ${formatMoney(value / 100)}` : ''}`}
    description={type.description}
  >
    <input
      type={type.name}
      value={value}
      onChange={(event) => onChange(createPatchFrom(event.target.value))}
    />
  </FormField>
);

PriceInput.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default PriceInput;
