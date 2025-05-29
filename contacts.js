const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const dataBuffer = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(dataBuffer);
  return contactsList;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contactsList = await listContacts();
  const removeContact = await getContactById(contactId);
  if (removeContact) {
    const newList = contactsList.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  }
  return removeContact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const id = uuid.v4();
  const newContact = { id, name, email, phone };
  const contactsList = await listContacts();
  const newList = [...contactsList, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
