import React,{useState} from 'react'
import { TextField } from "@mui/material";
import "../../css/RestaurantProfile.scss"

const Profile = () => {
    const [editable, setEditable] = useState(true);
    const [saveButton, setSaveButton] = useState(true);
    const [editButton, setEditButton] = useState(false);
  
    const handleEdit = () => {
      setEditable(false);
      setSaveButton(false);
      setEditButton(true);
    };
  
    const handleSave = () => {
      setEditable(true);
      setSaveButton(true);
      setEditButton(false);
    };
    const handleCancel = () => {
      setEditable(true);
      setSaveButton(true);
      setEditButton(false);
    };
  
    return (
      <div className='profile_container'>
        <button
          className={editButton ? "edit_button disabled" : "edit_button"}
          disabled={editButton}
          onClick={handleEdit}
        >
          Edit&ensp;<i class="fa-solid fa-pen-to-square"></i>
        </button>
        <div className="field one">
          <h4>Name</h4>
          {editable ? (
            <p>Name</p>
          ) : (
            <TextField
              id="phone-number"
              className="phone_number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter Your Phone Number"
              fullWidth
              margin="normal"
              color="error"
              style={{ width: "40%" }}
              inputProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
              }}
            />
          )}
        </div>
        <div className="field two">
          <h4>Name</h4>
          {editable ? (
            <p>Name</p>
          ) : (
            <TextField
              id="phone-number"
              className="phone_number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter Your Phone Number"
              fullWidth
              margin="normal"
              color="error"
              style={{ width: "40%" }}
              inputProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
              }}
            />
          )}
        </div>
        <div className="field three">
          <h4>Name</h4>
          {editable ? (
            <p>Name</p>
          ) : (
            <TextField
              id="phone-number"
              className="phone_number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter Your Phone Number"
              fullWidth
              margin="normal"
              color="error"
              style={{ width: "40%" }}
              inputProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
              }}
            />
          )}
        </div>
        <div className="field four">
          <h4>Name</h4>
          {editable ? (
            <p>Name</p>
          ) : (
            <TextField
              id="phone-number"
              className="phone_number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter Your Phone Number"
              fullWidth
              margin="normal"
              color="error"
              style={{ width: "40%" }}
              inputProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Poppins, sans-serif", fontWeight: "500" },
              }}
            />
          )}
        </div>
  
        <div className="field five">
          <button
            className={saveButton ? "save_button disabled" : "save_button"}
            disabled={saveButton}
            onClick={handleSave}
          >
            Save&ensp;<i className="fa-solid fa-floppy-disk"></i>
          </button>
          <button
            className={saveButton ? "cancel_button disabled" : "cancel_button"}
            disabled={saveButton}
            onClick={handleCancel}
          >
            Cancel&ensp;<i className="fa-solid fa-ban"></i>
          </button>
        </div>
      </div>
    );
  }


export default Profile;