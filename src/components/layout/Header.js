import { useState } from "react";
import { Link } from "react-router-dom";
import introJs from "intro.js";
import "intro.js/introjs.css";

const Header = (props) => {
  const [status, setStatus] = useState({
    currentActive: 1,
    allObjects: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  });
  const handleClick = (index) => {
    setStatus({
      ...status,
      currentActive: index,
    });
  };

  const toggleClass = (index) => {
    if (status.currentActive === index) return "active";
    else return "";
  };
  return (
    <header>
      <div className="topnav">
        <Link
          className={toggleClass(1)}
          onClick={() => {
            handleClick(1);
          }}
          to="/"
        >
          Contacts <i className="fa fa-home"></i>
        </Link>
        <Link
          className={toggleClass(2)}
          data-title="Add Contact"
          data-intro="Click here to add a new contact"
          data-step={1}
          data-disable-interaction={true}
          onClick={() => {
            handleClick(2);
          }}
          to="/contact/add"
        >
          Add <i className="fa fa-plus"></i>
        </Link>
        {/* <Link
          className={toggleClass(3)}
          onClick={() => {
            handleClick(3);
          }}
          to="#contact"
        >
          Contact
        </Link> */}
        <Link
          className={toggleClass(4)}
          onClick={() => {
            handleClick(4);
          }}
          to="/about"
          data-title="About Contact Manager"
          data-intro="Click here to Know about Various Features of the Contact Manager"
          data-step={6}
          data-disable-interaction={true}
        >
          About <i className="fa fa-question"></i>
        </Link>
        <Link
          to="/"
          onClick={() => {
            // console.log(window.location.pathname);
            window.location.pathname === "/"
              ? introJs().start()
              : setTimeout(() => introJs().start(), 100);
          }}
          data-title="Take Demo Anytime"
          data-intro="Click here to take demo anytime"
          data-step={7}
          data-disable-interaction={true}
        >
          Demo <i className="fa fa-lightbulb-o"></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
