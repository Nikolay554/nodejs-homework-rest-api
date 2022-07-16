 const fs = require('fs/promises')
 const path = require('path');
 const {nanoid} = require('nanoid');

 const contactsPath = path.join(__dirname, "contacts.json");

 const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (contactId) => {
      const contacts = await listContacts();
    const resultContactId =  contacts.find(item => item.id === contactId);
    if ( !resultContactId) {
        return null;
    }
    return resultContactId;
  }


const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(idx, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
}

const addContact = async ({name, email, phone}) => {
      const contacts = await listContacts();
    const newContact = {
        name,
        email,
        phone,
         id: nanoid(),
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  
}

const updateContact = async (id, {name, email, phone}) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
        return  null;
    }
    contacts[idx] = {id, name, email, phone};
     
    await updateContacts(contacts);
    return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
