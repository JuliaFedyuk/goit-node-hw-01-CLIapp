const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    const allContacts = JSON.parse(data);
    console.log("List of contacts");
    console.table(allContacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    const allContacts = JSON.parse(data);

    const selectedContactById = allContacts.find((contact) => {
      if (contact.id === contactId) {
        console.log(`Selected contact by id ${contactId}`);
        console.table(contact);
        return contact;
      }
    });

    if (selectedContactById == null) {
      console.log(`Contact with ID ${contactId} not found`);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }

    const allContacts = JSON.parse(data);
    const newContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    if (allContacts.length === newContacts.length) {
      console.log(
        `The contact has not removed, there is no contact with ID ${contactId}`
      );
      return;
    }
    console.log("The contact deleted successfully");
    console.table(newContacts);

    fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
      if (error) {
        return console.log(error);
      }
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }

    const allContacts = JSON.parse(data);

    allContacts.push({
      id: allContacts.length + 1,
      name: name,
      email: email,
      phone: phone,
    });

    console.log("Contact has successfully added to contact list");
    console.table(allContacts);

    fs.writeFile(contactsPath, JSON.stringify(allContacts), (error) => {
      if (error) {
        return console.log(error);
      }
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
