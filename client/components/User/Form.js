import React, { useState } from "react";
import { useForm } from "react-hook-form";
import fire from "../../fire";
import axios from "axios";
const {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET
} = require("../../../cloudinary");

const db = fire.database();

export default function Form(props) {
  const { userId } = props;
  const [image, setImage] = useState(null);
  const { register, handleSubmit, errors } = useForm();

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

  const onSubmit = data => {
    db.ref(`players/${userId}`).set({
      nickname: data.nickname,
      totalGamesPlayed: 0,
      totalPoints: 0,
      wins: 0,
      profilePic: image
    });
    props.history.push("/");
  };

  return (
    <div className="m-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 style={{ marginBottom: "20px" }}>Complete your profile</h2>
        <label style={{ display: "block" }} htmlFor="nickname">
          Nickname{" "}
          <input
            style={{ marginBottom: "10px" }}
            type="text"
            placeholder="Ex: Game lover"
            name="nickname"
            ref={register({ required: true, minLength: 2 })}
          />
        </label>
        {errors.nickname && <p>Must be at least 2 characters long</p>}

        <label style={{ display: "block" }} htmlFor="profilePic">
          Profile Picture{" "}
          <input
            style={{ marginBottom: "10px" }}
            type="file"
            placeholder="upload a picture"
            name="profilePic"
            ref={register}
            onChange={handleImage}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
