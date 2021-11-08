import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import Container from './components/Container';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

function App() {
  // ленивая инициализация состояния = lazy state initialization
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //===== Добавление нового контакта =====
  const addContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    // Проверка на повторный ввод существующего контакта
    const normalizedName = name.toLowerCase();
    contacts.some(contact => contact.name.toLowerCase() === normalizedName)
      ?
        alert(`${name} is already in contacts.`)
      : 
        setContacts(prevState => [contact, ...prevState]);
  }

  //===== Удаление контакта =====
  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };
  // ===== Запись значения Фильтра из инпута =====
  const handleFilter = e => {
    setFilter(e.currentTarget.value);
  };
  // ===== Фильтр =====
  const showFilteredContacts = () => {
    const normalizedFilter = filter.trim().toLowerCase();

    return (contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter) ||
      contact.number.includes(filter.trim())
    ));
  };

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
};

export default App;