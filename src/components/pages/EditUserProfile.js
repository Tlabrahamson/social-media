import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import Dropzone from "react-dropzone";

export default function EditUserProfile() {
  const { userData } = useContext(UserContext);

  const submit = async e => {
    e.preventDefault();
    try {
      const updateUser = {
        displayName: userData.user.displayName,
        userBio: userData.user.userBio
      };
      await Axios.post("http://localhost:5000/users/edit-profile", updateUser);
    } catch (err) {
      console.log(err);
    }
  };

  if (userData.user) {
    return (
      <div className="page">
        <div className="profile-card">
          <h2>{userData.user.displayName}, care to edit some things?</h2>

          <form className="form" onSubmit={submit}>
            <label htmlFor="display-name">Change your display name:</label>
            <input type="text" placeholder={userData.user.displayName} />

            <label htmlFor="bio">Update your Bio:</label>
            <textarea placeholder={userData.user.userBio} />

            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section className="drop-zone">
                  <div className="file-drop" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag a file here, or click to browse</p>
                  </div>
                </section>
              )}
            </Dropzone>
            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="page">
      <h2>You should probably login first...</h2>
    </div>
  );
}
