// import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ProfessionalExperience() {
  return (
    <form className="row g-3 h-100">
      <div id="positionTitlehtmlForm" className="form-group col-md-6">
        <label htmlFor="positionTitle" className="htmlForm-label">
          Position Title
        </label>
        <input id="positionTitle" type="text" className="htmlForm-control" />
      </div>

      <div id="companynamehtmlForm" className="form-group col-md-6">
        <label htmlFor="company" className="htmlForm-label">
          Company
        </label>
        <input id="company" type="text" className="htmlForm-control" />
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
          <option value="State">Choose...</option>
          <option value="...">...</option>
        </select>
      </div>

      <div className="col-6">
        <label htmlFor="startDate" className="htmlForm-label">
          Start Date
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
      </div>

      <div className="col-6">
        <label htmlFor="endDate" className="htmlForm-label">
          End Date
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
      </div>

      <div className="col-md-12">
        <label htmlFor="summary" className="htmlForm-label">
          Work Summary
        </label>
        <input
          type="text"
          className="htmlForm-control"
          id="summary"
          placeholder=""
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

export default ProfessionalExperience;
