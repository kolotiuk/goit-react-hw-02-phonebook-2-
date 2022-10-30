import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = contact => {
    const sameContact = this.state.contacts.find(
      el => el.name === contact.name
    );

    if (sameContact) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleChange = e => this.setState({ filter: e.target.value });

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const { handleAddContact, handleChange, handleDeleteContact } = this;
    const filteredContacts = filter
      ? contacts.filter(el =>
          el.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={handleAddContact} />

        <h2>Contacts</h2>
        <Filter handleChange={handleChange} filter={filter} />
        <ContactList
          contacts={filteredContacts}
          handleDeleteContact={handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
