const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
require("colors");
const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(contacts);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(({ id }) => id === contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return newContacts;
  } catch (error) {}
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
