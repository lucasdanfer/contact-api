class Contact {
    add(contact, res) {
        if (contact.name.length > 0) {
            res.status(200).json(contact)
        } else {
            res.status(400).json(contact)
        }
    }
}

module.exports = new Contact