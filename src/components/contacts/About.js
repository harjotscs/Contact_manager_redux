const About = () => {
  return (
    <div>
      <h1 className="title">About</h1>
      <div className="content-about">
        <br />
        <div className="circle-graphics">
          <div className="circle-graphic">
            <div className="circle">
              <i className="fa fa-plus"></i>
            </div>
            <p className="circle-content">Add Contact</p>
          </div>
          <div className="circle-graphic">
            <div className="circle">
              <i className="fa fa-edit"></i>
            </div>
            <p className="circle-content">Edit Contact</p>
          </div>
          <div className="circle-graphic">
            <div className="circle">
              <i className="fa fa-trash"></i>
            </div>
            <p className="circle-content">Delete Contact</p>
          </div>
          <div className="circle-graphic">
            <div className="circle">
              <i className="fa fa-search"></i>
            </div>
            <p className="circle-content">Search Contact</p>
          </div>

          <div className="circle-graphic">
            <div className="circle">
              <i className="fa fa-tint"></i>
            </div>
            <p className="circle-content">Colourful Contacts</p>
          </div>
        </div>
        <br />
        <p className="about-content-text">
          A MERN Stack Contact Manager Web App built without any CSS
          Framework/dependency. Hover on Any icon above to see amazing Animation
        </p>
      </div>
    </div>
  );
};

export default About;
