import React,{useEffect, useState} from 'react'
import { TextField } from "@mui/material";
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "../../css/AdminProfile.scss"


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AdminProfile = () => {
    const [editable, setEditable] = useState(true);
    const [saveButton, setSaveButton] = useState(true);
    const [editButton, setEditButton] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    
  ]);

  const handleCancelAvatar = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  
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
          Edit&ensp;<i className="fa-solid fa-pen-to-square"></i>
        </button>
        <div className="field one">
          <h4>Avatar</h4>
          {editable ? (
            <img src="" alt="avatar" style={{border:"1px solid black", borderRadius:"50%", width:'90px', height:"90px", marginLeft:"1.5%"}}></img>
          ) : (
            <div className='upload_div'>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length > 0 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelAvatar}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
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
  
        <div className="field six">
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


export default AdminProfile;