import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteContact } from "../../redux";

const Contact = (props) => {
  //   const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  let color;
  let color1rgb = null;

  function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  }

  const generateValidColor = () => {
    color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    color1rgb = hexToRgb(color);
    while (color1rgb === null) {
      generateValidColor();
    }
  };

  generateValidColor();

  // console.log(color1rgb);

  function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
  function contrast(rgb1, rgb2) {
    var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  while (contrast([255, 255, 255], color1rgb) < 4.5) {
    generateValidColor();
  }
  const [isExpanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  window.onclick = function (event) {
    event.target.className === "details" && setExpanded(!isExpanded);
  };

  const {
    _id,
    name,
    phone,
    email,
    deleteContact,
    dataTitleContact,
    dataIntroContact,
    dataTitleEdit,
    dataIntroEdit,
    dataTitleDelete,
    dataIntroDelete,
  } = props;
  return (
    <React.Fragment>
      <div
        style={{ display: deleting ? "block" : "none" }}
        className="sk-chase"
      >
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
      <div
        className="contact"
        onClick={(event) => {
          if (event.target.className === "fa fa-trash") return;
          setExpanded(!isExpanded);
          window.scrollTo(0, 0);
        }}
        style={{
          backgroundColor: color,
          display: isExpanded ? "none" : "block",
        }}
        data-title={dataTitleContact}
        data-intro={dataIntroContact}
        data-step={2}
        data-disable-interaction={true}
      >
        <div className="contact-actions">
          <Link to={`/contact/edit/${_id}`}>
            {" "}
            <i
              style={{ fontSize: "1.5rem" }}
              data-title={dataTitleEdit}
              data-intro={dataIntroEdit}
              data-step={3}
              data-disable-interaction={true}
              className="fa fa-edit"
            ></i>
          </Link>
          {/* <p
            className="contact-dot"
            onClick={() => {
              setExpanded(!isExpanded);
              window.scrollTo(0, 0);
            }}
          ></p> */}
        </div>

        <div className="content">
          <p className="contact-representation">{name.substr(0, 1)}</p>
          <p className="contact-name">{name}</p>
        </div>
        <div className="contact-delete">
          <i
            style={{ fontSize: "1.5rem" }}
            className="fa fa-trash"
            data-title={dataTitleDelete}
            data-intro={dataIntroDelete}
            data-step={4}
            data-disable-interaction={true}
            onClick={async () => {
              setDeleting(true);
              deleteContact(_id);
            }}
          ></i>
        </div>
      </div>

      <div
        className="details"
        style={{ display: isExpanded ? "block" : "none" }}
      >
        <div
          className="details-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span
            onClick={() => {
              setExpanded(!isExpanded);
            }}
            className="close"
          >
            &times;
          </span>
          <p>
            <i className="fa fa-user"></i> Name : {name}
          </p>
          <hr />
          <p>
            <i className="fa fa-phone"></i> Phone Number: {phone}
          </p>
          <hr />
          <p>
            <i className="fa fa-envelope"></i> Email: {email}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: (_id) => dispatch(deleteContact(_id)),
  };
};

export default connect(null, mapDispatchToProps)(Contact);
