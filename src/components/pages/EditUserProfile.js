import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import Dropzone from "react-dropzone";
import ErrorNotice from "../../components/misc/ErrorNotice";

export default function EditUserProfile() {
  const { userData } = useContext(UserContext);
  const [displayName, setDisplayName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [error, setError] = useState();

  const submit = e => {
    try {
      const updateUser = {
        displayName,
        userBio
      };
      Axios.post("http://localhost:5000/users/update", updateUser);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  if (userData.user) {
    return (
      <div className="page">
        <div className="profile-card">
          <h2>{userData.user.displayName}, care to edit some things?</h2>
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <form className="form" onSubmit={submit}>
            <label htmlFor="display-name">Change your display name:</label>
            <input
              type="text"
              placeholder={userData.user.displayName}
              onChange={e => setDisplayName(e.target.value)}
            />

            <label htmlFor="bio">Update your Bio:</label>
            <textarea
              placeholder={userData.user.userBio}
              onChange={e => setUserBio(e.target.value)}
            />

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
