const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// In-memory storage
let people = [];
let idCounter = 1;

// Create a person
app.post('/people', (req, res) => {
    const { name, age, phone } = req.body;
    if (!name || !age || !phone) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const newPerson = { id: idCounter++, name, age, phone };
    people.push(newPerson);
    res.json({ message: 'Person added successfully.' });
});

// Read all people
app.get('/people', (req, res) => {
    res.json(people);
});

// Read a single person by ID
app.get('/people/:id', (req, res) => {
    const person = people.find(p => p.id === parseInt(req.params.id));
    if (!person) {
        return res.status(404).json({ message: 'Person not found.' });
    }
    res.json(person);
});

// Update a person
app.put('/people/:id', (req, res) => {
    const person = people.find(p => p.id === parseInt(req.params.id));
    if (!person) {
        return res.status(404).json({ message: 'Person not found.' });
    }
    const { name, age, phone } = req.body;
    person.name = name || person.name;
    person.age = age || person.age;
    person.phone = phone || person.phone;
    res.json({ message: 'Person updated successfully.' });
});

// Delete a person
app.delete('/people/:id', (req, res) => {
    const index = people.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Person not found.' });
    }
    people.splice(index, 1);
    res.json({ message: 'Person deleted successfully.' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
