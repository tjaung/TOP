function PersonalDetails() {
  return (
    <form className="row g-0 h-100">
      <div id="firstNamehtmlForm" className="form-group col-md-6">
        <label htmlFor="firstName" className="htmlForm-label">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          className="htmlForm-control"
          placeholder="First Name"
        />
      </div>

      <div id="lastNamehtmlForm" className="form-group col-md-6">
        <label htmlFor="lastName" className="htmlForm-label">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          className="htmlForm-control"
          placeholder="Last Name"
        />
      </div>

      <div id="jobTitlehtmlForm" className="form-group col-12">
        <label htmlFor="jobTitle" className="htmlForm-label">
          Job Title
        </label>
        <input
          id="jobTitle"
          type="text"
          className="htmlForm-control"
          placeholder="Job Title"
        />
      </div>
      <div className="col-12">
        <label htmlFor="inputAddress" className="htmlForm-label">
          Address
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="inputAddress"
          placeholder="1234 Main St"
        />
      </div>
      <div className="col-12">
        <label htmlFor="inputAddress2" className="htmlForm-label">
          Address 2
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="inputAddress2"
          placeholder="Apartment, studio, or floor"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputCity" className="htmlForm-label">
          City
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="inputCity"
          placeholder="City"
        />
      </div>

      <div className="col-md-4">
        <label htmlFor="inputState" className="htmlForm-label">
          State
        </label>
        <select id="inputState" className="htmlForm-select">
          <option selected>Choose...</option>
          <option>...</option>
        </select>
      </div>

      <div className="col-md-2">
        <label htmlFor="inputZip" className="htmlForm-label">
          Zip
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="inputZip"
          placeholder="Zip Code"
        />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}

export default PersonalDetails;
