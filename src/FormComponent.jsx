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
  const [editPerson, setEditPerson] = useState(null); // Add state for the person being edited

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

  const handleEdit = (person) => {
    setEditPerson(person); // Set the person to be edited
  };

  const handleSaveEdit = () => {
    // Find the index of the person in the array
    const index = people.findIndex((p) => p.id === editPerson.id);

    if (index !== -1) {
      // Update the person's details
      const updatedPeople = [...people];
      updatedPeople[index] = editPerson;
      setPeople(updatedPeople);
      setEditPerson(null); // Clear the editPerson state
    }
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
        {/* ... Your form input fields ... */}
        <button style={{backgroundColor:"#3498DB", fontSize:"15px"}} type="button" onClick={handleSubmit}>
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
              <td>{editPerson && editPerson.id === person.id ? (
                <input
                  type="text"
                  value={editPerson.firstName}
                  onChange={(e) => setEditPerson({ ...editPerson, firstName: e.target.value })}
                />
              ) : person.firstName}</td>
              <td>{editPerson && editPerson.id === person.id ? (
                <input
                  type="text"
                  value={editPerson.lastName}
                  onChange={(e) => setEditPerson({ ...editPerson, lastName: e.target.value })}
                />
              ) : person.lastName}</td>
              <td>{editPerson && editPerson.id === person.id ? (
                <input
                  type="email"
                  value={editPerson.email}
                  onChange={(e) => setEditPerson({ ...editPerson, email: e.target.value })}
                />
              ) : person.email}</td>
              <td>{editPerson && editPerson.id === person.id ? (
                <input
                  type="text"
                  value={editPerson.gender}
                  onChange={(e) => setEditPerson({ ...editPerson, gender: e.target.value })}
                />
              ) : person.gender}</td>
              <td>{editPerson && editPerson.id === person.id ? (
                <input
                  type="text"
                  value={editPerson.number}
                  onChange={(e) => setEditPerson({ ...editPerson, number: e.target.value })}
                />
              ) : person.number}</td>
              <td>
                {editPerson && editPerson.id === person.id ? (
                  <span>
                  <button style={{backgroundColor:"yellow", fontSize:"15px"}} onClick={handleSaveEdit}>Save</button>
                  <span style={{ margin: '0 4px' }}></span> {/* Add some margin for spacing */}
                  <button style={{backgroundColor:"Green", fontSize:"15px"}} onClick={() => handleEdit(person)}>Edit</button>
                </span>
                ) : (
                  <span>
      <button style={{backgroundColor:"Green", fontSize:"15px"}} onClick={() => handleEdit(person)}>Edit</button>
      <span style={{ margin: '0 4px' }}></span> {/* Add some margin for spacing */}
      <button
        style={{backgroundColor:"Red", fontSize:"15px"}} onClick={() => {
          const updatedPeople = people.filter((p) => p.id !== person.id);
          setPeople(updatedPeople);
        }}
      >
        Delete
      </button>
    </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormComponent;
