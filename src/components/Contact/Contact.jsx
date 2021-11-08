import PropTypes from 'prop-types';
import s from './Contact.module.css';

function Contact({ onDeleteContact, name, number }) { 
  return (
    <li className={s.contactItem}>
      <p className={s.contact}>• {name}: {number}</p>
      <button className={s.btn} onClick={onDeleteContact}>
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;