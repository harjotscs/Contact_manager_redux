import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllContacts } from "../../redux";
import Contact from "./Contact";
import Search from "./Search";

const Contacts = (props) => {
  const { fetchContacts, contactsData } = props;
  // console.log(contactsData);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);
  let dataTitleContact,
    dataIntroContact,
    dataTitleEdit,
    dataIntroEdit,
    dataTitleDelete,
    dataIntroDelete;
  return (
    <React.Fragment>
      <Search />
      <div className="contacts">
        {contactsData.isLoading ? (
          <h2 className="title">Loading Contacts, Please Wait...</h2>
        ) : contactsData.error ? (
          <h2 style={{ color: "red" }} className="title">
            {contactsData.error}, Please Check your Internet connection
          </h2>
        ) : (
          contactsData.contacts
            .filter((contact) => {
              if (contactsData.searchKey === "") {
                return contact;
              } else if (
                contact.name
                  .toLowerCase()
                  .includes(contactsData.searchKey.toLowerCase())
              ) {
                return contact;
              }
              return false;
            })
            .map((contact, index) => {
              if (index === 0) {
                dataTitleContact = "Expand Contact!";
                dataIntroContact =
                  "Click anywhere on the contact tile except Edit/Delete icon to view details of the Contact";
                dataTitleEdit = "Edit Contact";
                dataIntroEdit = "Click this icon to Edit an Existing Contact";
                dataTitleDelete = "Delete Contact";
                dataIntroDelete = "Click this icon to Delete Contact";
              } else {
                dataTitleContact = null;
                dataIntroContact = null;
                dataTitleEdit = null;
                dataIntroEdit = null;
                dataTitleDelete = null;
                dataIntroDelete = null;
              }
              return (
                <Contact
                  key={contact._id}
                  _id={contact._id}
                  name={contact.name}
                  email={contact.email}
                  phone={contact.phone}
                  dataTitleContact={dataTitleContact}
                  dataIntroContact={dataIntroContact}
                  dataTitleEdit={dataTitleEdit}
                  dataIntroEdit={dataIntroEdit}
                  dataTitleDelete={dataTitleDelete}
                  dataIntroDelete={dataIntroDelete}
                  // dataTitle="Expand Contact!"
                  //dataIntro="Click anywhere on the contact except Edit/Delete button to view details of the Contact"
                />
              );
            })
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    contactsData: state.contacts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchContacts: () => dispatch(fetchAllContacts),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
