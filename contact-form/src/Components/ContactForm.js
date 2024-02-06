import React, { useState, useEffect } from "react";
import "./general.css";

const ContactForm = ({ onAdd, onEdit, selectedContact, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name);
      setEmail(selectedContact.email);
    }
  }, [selectedContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format");
      return;
    }

    const contact = { id: selectedContact?.id || Date.now(), name, email };

    if (selectedContact) {
      onEdit(selectedContact.id, contact);
    } else {
      onAdd(contact);
    }

    setName("");
    setEmail("");
    setError("");
  };

  return (
    <div className="contact-form-main-container">
      <>
        <form onSubmit={handleSubmit} className="contact-form-input-container">
          <h2>Contact Form</h2>

          <div className="input-fields">
            <label className="input-label">Name:</label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="input-label">Email:</label>
            <input
              type="text"
              value={email}
              placeholder="Email"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="btn-container">
            <button className="add-btn" type="submit">
              {selectedContact ? "Update" : "Add"}
            </button>
            {selectedContact && (
              <button type="button" className="cancel-btn" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </>
    </div>
  );
};

export default ContactForm;
