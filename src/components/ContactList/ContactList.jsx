import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import Contact from '../Contact';

function ContactList({ deleteContact, filteredContacts }) {
  return (
    <ul className={s.contactList}>
      {filteredContacts.map(({ id, name, number }) => {
        return (
          <Contact
            key={id}
            onDeleteContact={() => deleteContact(id)}
            id={id}
            name={name}
            number={number}>
          </Contact>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape()).isRequired,
};

export default ContactList;