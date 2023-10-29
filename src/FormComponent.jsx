import React, { useState } from 'react';

function FormComponent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    number: '',
    email: '',
    gender: '',
    subjects: [],
  });

  const [people, setPeople] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    const subjects = [...formData.subjects];

    if (checked) {
      subjects.push(value);
    } else {
      const index = subjects.indexOf(value);
      if (index !== -1) {
        subjects.splice(index, 1);
      }
    }

    setFormData({
      ...formData,
      subjects,
    });
  };

  const handleSubmit = () => {
    // Validate the number
    if (formData.number.length !== 10) {
      alert('Number must be 10 digits long');
      return;
    }

    // Generate a random ID
    const id = Math.random().toString(36).substr(2, 9);

    // Create a new person object
    const newPerson = { ...formData, id };

    // Add the person to the list
    setPeople([...people, newPerson]);

    // Clear the form
    setFormData({
      firstName: '',
      lastName: '',
      number: '',
      email: '',
      gender: '',
      subjects: [],
    });
  };

  return (
    <div>
      <h2>Person Form</h2>
      <form>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Gender"
        />
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Number"
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>

      <h2>People Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-mail</th>
            <th>Gender</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.email}</td>
              <td>{person.gender}</td>
              <td>{person.number}</td>
              <td>
                <button
                  onClick={() => {
                    // Handle delete action using person.id
                    const updatedPeople = people.filter((p) => p.id !== person.id);
                    setPeople(updatedPeople);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormComponent;