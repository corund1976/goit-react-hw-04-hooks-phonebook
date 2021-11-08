import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import Container from './components/Container';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts
      })
    }
  };

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  //===== Метод добавления нового контакта =====
  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    // Проверка на повторный ввод существующего контакта
    const normalizedName = name.toLowerCase();
    contacts.some(contact =>
      contact.name.toLowerCase() === normalizedName)
      ?
        alert(`${name} is already in contacts.`)
      : 
        this.setState(prevState => ({
          contacts: [contact, ...prevState.contacts],
        }));
        // this.setState(prevState => {
          //   return(
          //     { contacts: [...prevState.contacts, contact] }
          //   )
          // })  
  }

  //===== Метод удаления контакта =====
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    //  return (
    //     { contacts: prevState.contacts.filter(item => item.id !== id) }
    //   );
    // })
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  //===== Метод фильтра
  showFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter) ||
      contact.number.includes(filter),
    );
  };

  render() {
    const { filter } = this.state;
    const { addContact, handleFilter, deleteContact, showFilteredContacts } = this;
    return (
      <Container>
        <Section>
          <h1>Phonebook</h1>
          <ContactForm
            addContact={addContact} />
        </Section>
        
        <Section>
          <h2>Contacts</h2>
          <Filter
            filterValue={filter}
            handleFilter={handleFilter} />
          <ContactList
            filteredContacts={showFilteredContacts()}
            deleteContact={deleteContact} />
        </Section>
      </Container>
    );
  }
};

export default App;