import axios from "axios";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACT,
  GET_CONTACTS_FAILURE,
  GET_CONTACTS_REQUEST,
  GET_CONTACTS_SUCCESS,
  SEARCH_CONTACTS,
  UPDATE_CONTACT,
} from "../types/contactTypes";

export const getContactsRequest = () => {
  return {
    type: GET_CONTACTS_REQUEST,
  };
};

export const getContactsSuccess = (contacts) => {
  return {
    type: GET_CONTACTS_SUCCESS,
    payload: contacts,
  };
};

export const getContactsFailure = (error) => {
  return {
    type: GET_CONTACTS_FAILURE,
    payload: error,
  };
};

export const searchContacts = (searchKey) => {
  return {
    type: SEARCH_CONTACTS,
    payload: searchKey,
  };
};

export const addContact = (contact) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/contact/add`,
      contact
    );
    dispatch({
      type: ADD_CONTACT,
      payload: res.data,
    });
    return [true];
  } catch (e) {
    return [false, "Some Issue At Backend"];
  }
};

export const deleteContact = (id) => async (dispatch) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/contact/delete/${id}`
  );
  console.log("deleted");
  dispatch({
    type: DELETE_CONTACT,
    payload: res.data,
  });
};

export const getContact = (id) => async (dispatch) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/contact/${id}`);
  dispatch({
    type: GET_CONTACT,
    payload: res.data,
  });
  return true;
};

export const updateContact = (contact) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/contact/${contact._id}`,
      contact
    );
    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const fetchAllContacts = async (dispatch) => {
  dispatch(getContactsRequest());
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/contacts`
    );
    dispatch(getContactsSuccess(response.data));
  } catch (error) {
    dispatch(getContactsFailure(error.message));
  }
};
