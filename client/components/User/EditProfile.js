import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useObjectVal } from "react-firebase-hooks/database";
import fire from "../../fire";
import axios from "axios";
const db = fire.database();
const {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET
} = require("../../../cloudinary");

const EditProfile = props => {
  const { userId } = props;
  const playerRef = fire.database().ref(`players/${userId}`);
  const [player, loading, error] = useObjectVal(playerRef);
  const { register, handleSubmit, errors } = useForm();
  const [image, setImage] = useState(null);
  if (loading) return "";
  if (error) return "Error";

  const onSubmit = data => {
    db.ref(`players/${props.userId}`).update({
      nickname: data.nickname,
      profilePic: image
    });
    props.history.push("/profile");
  };

  const handleImage = evt => {
    const file = evt.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    axios
      .post(CLOUDINARY_UPLOAD_URL, formData)
      .then(res => {
        setImage(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="m-3">
      <button
        className="btn btn-outline-dark"
        type="button"
        onClick={() => props.history.goBack()}
      >
        Back to My Profile
      </button>
      <div className="input-group m-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="formMain">Update Your Profile</h1>
          <label htmlFor="nickname">
            <input
              className="nickname"
              type="text"
              defaultValue={player.nickname}
              name="nickname"
              ref={register({ required: true })}
            />
          </label>
          <label htmlFor="profilePic">
            Profile Picture{" "}
            <input
              type="file"
              placeholder="upload a picture"
              name="profilePic"
              ref={register}
              onChange={handleImage}
            />
          </label>
          <span className="input-group-btn">
            <button
              type="submit"
              className="btn alert-light text-dark btn-sm"
              id="btn-chat"
            >
              Update Profile
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
