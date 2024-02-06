import React, { useState } from "react";

const MergeContacts = ({ contacts, onMerge }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedContacts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleMerge = () => {
    const uniqueContacts = Array.from(new Set(selectedContacts)).map((id) =>
      contacts.find((contact) => contact.id === id)
    );

    onMerge(uniqueContacts);
    setSelectedContacts([]);
  };

  return (
    <div className="merge-main-container">
      <div className="merge-sub-container">
        <h2>Contact Merging</h2>
        <ul className="merge-ul">
          {contacts &&
            contacts.map((contact) => (
              <li key={contact.id} className="merge-contacts-li">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => handleCheckboxChange(contact.id)}
                />
                {contact.name} - {contact.email}
              </li>
            ))}
        </ul>
        <button className="merge-btn" onClick={handleMerge}>
          Merge Selected Contacts
        </button>
      </div>
    </div>
  );
};

export default MergeContacts;
