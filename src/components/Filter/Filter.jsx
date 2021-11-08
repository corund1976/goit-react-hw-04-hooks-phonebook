import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({ filterValue, handleFilter }) {
  return (
    <label className={s.label}>
      Find contacts by name / number
      <input
        type="text"
        value={filterValue}
        onChange={handleFilter}
        className={s.input}>
      </input>
    </label>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default Filter;