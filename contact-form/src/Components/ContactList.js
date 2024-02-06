import React from "react";

const ContactList = ({ contacts, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts &&
          contacts.map((contact) => (
            <li key={contact.id} className="contact-list-li">
              {contact.name} - {contact.email}{" "}
              <button onClick={() => onEdit(contact)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => onDelete(contact.id)}
                className="delete-btn"
              >
                Delete
              </button>
              <hr />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ContactList;
