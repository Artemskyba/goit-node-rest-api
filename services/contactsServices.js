const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  return contacts;
}

async function getOneContactById(contactId) {
  const contacts = await listContacts();
  const data = contacts.find((contact) => contact.id === contactId);
  if (data) {
    return data;
  }
  return null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    const deletedContact = contacts.splice(index, 1)[0];
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return deletedContact;
  }
  return null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
  return newContact;
}

async function updateContactById(id, newContactData) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  contacts[index] = {
    ...contacts[index],
    ...newContactData,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
  return contacts[index];
}

module.exports = {
  listContacts,
  getOneContactById,
  removeContact,
  addContact,
  updateContactById,
};
