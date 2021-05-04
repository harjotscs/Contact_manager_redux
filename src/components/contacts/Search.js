import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { searchContacts } from "../../redux";
import InputBox from "../layout/InputBox";

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    props.searchContacts(searchTerm);
  });

  return (
    <form className="search-form" action="">
      <InputBox
        className="input-search"
        type="text"
        value={searchTerm}
        placeholder="Enter Contact Name"
        handleChange={handleChange}
        dataTitle="Search Contact"
        dataIntro="Enter contact name to search a contact"
        data-step={5}
        name="name"
      />
      <button className="search-button" disabled>
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchContacts: (searchTerm) => dispatch(searchContacts(searchTerm)),
  };
};

export default connect(null, mapDispatchToProps)(Search);
