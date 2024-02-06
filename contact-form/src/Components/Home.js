import React, { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import MergeContacts from "./MergeContacts";
import "./general.css";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [mergedContacts, setMergedContacts] = useState([]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const editContact = (id, updatedContact) => {
    setContacts(
      contacts.map((contact) => (contact.id === id ? updatedContact : contact))
    );
    setSelectedContact(null);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const mergeContacts = (selectedContacts) => {
    const uniqueContacts = [];
    const encounteredEmails = new Set();

    selectedContacts.forEach((contact) => {
      if (!encounteredEmails.has(contact.email)) {
        uniqueContacts.push(contact);
        encounteredEmails.add(contact.email);
      }
    });

    setMergedContacts(uniqueContacts);
  };

  return (
    <div>
      <h1>Contact Management Application</h1>
      <div>
        <div className="details-container">
          <ContactForm
            onAdd={addContact}
            onEdit={editContact}
            selectedContact={selectedContact}
            onCancel={() => setSelectedContact(null)}
          />
          <ContactList
            contacts={contacts}
            onEdit={(contact) => setSelectedContact(contact)}
            onDelete={deleteContact}
          />
        </div>
        <hr className="hr-line" />
        <div className="merged-contacts-details">
          <MergeContacts contacts={contacts} onMerge={mergeContacts} />

          {mergedContacts.length > 0 && (
            <div>
              <h2>Merged Contacts</h2>
              <ul>
                {mergedContacts.map((contact) => (
                  <li key={contact.id} className="merged-details-final-li">
                    {contact.name} - {contact.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
