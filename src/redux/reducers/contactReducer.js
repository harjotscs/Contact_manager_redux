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

const initialState = {
  contacts: [],
  contact: {
    _id: "",
    name: "",
    email: "",
    phone: "",
  },
  searchKey: "",
  isLoading: false,
  error: "",
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
      };

    case GET_CONTACTS_FAILURE:
      return {
        ...state,
        contacts: [],
        isLoading: false,
        error: action.payload,
      };
    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contacts: action.payload,
      };
    case SEARCH_CONTACTS:
      return {
        ...state,
        searchKey: action.payload,
      };
    case ADD_CONTACT: {
      return {
        ...state,
        contacts: [action.payload, ...state.contacts].sort(),
      };
    }
    case DELETE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.filter((contact) => {
          return contact._id !== action.payload;
        }),
      };
    }
    case GET_CONTACT: {
      return {
        ...state,
        contact: action.payload,
      };
    }
    case UPDATE_CONTACT: {
      return {
        ...state,
        contact: {},
        contacts: state.contacts.map((contact) => {
          return contact._id === action.payload._id
            ? (contact = action.payload)
            : contact;
        }),
      };
    }
    default:
      return state;
  }
};
