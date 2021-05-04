import React, { useState } from "react";
import InputBox from "../layout/InputBox";
import { connect } from "react-redux";
import { addContact } from "../../redux";
const AddContact = (props) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const { addContact } = props;

  const validateContact = () => {
    if (contact.name === "") {
      setError("Please enter the name of the contact");
      return false;
    } else if (!/(.+)@(.+){2,}\.(.+){2,}/.test(contact.email)) {
      setError("Please enter a valid email of the contact");
      return false;
    } else if (contact.phone === "" || contact.phone.length < 10) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setContact((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    if (validateContact()) {
      setError("Please Wait...");
      const response = await addContact(contact);
      if (response[0]) {
        props.history.push("/");
      } else {
        // console.log("Something went wrong");
        setError(`${response[1]}, Please try again Later...`);
      }
    }
  };
  return (
    <React.Fragment>
      <h2 className="title">Add Contact</h2>
      <h3 className="error">{error}</h3>
      <form action="" className="search-form">
        <InputBox
          className="input-addContact"
          name="name"
          type="text"
          placeholder="Enter Name"
          handleChange={handleChange}
          value={contact.name}
        />
        <InputBox
          className="input-addContact"
          name="email"
          type="email"
          placeholder="Enter Email"
          handleChange={handleChange}
          value={contact.email}
        />
        <InputBox
          className="input-addContact"
          name="phone"
          type="text"
          placeholder="Enter Phone"
          handleChange={handleChange}
          value={contact.phone}
        />
        <br />
        <button
          className="submit-button"
          onClick={() => {
            handleSubmit();
          }}
          type="button"
        >
          Add Contact
        </button>
      </form>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => dispatch(addContact(contact)),
  };
};

export default connect(null, mapDispatchToProps)(AddContact);
