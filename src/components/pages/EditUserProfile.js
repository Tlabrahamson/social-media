import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
// Component
import ImageDrop from "../../components/layout/ImageDrop";
// Test image
import Avatar from "../../images/default-avatar.png";

export default function EditUserProfile() {
  const { userData } = useContext(UserContext);
  const [displayName, setDisplayName] = useState("");
  const [userBio, setUserBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState();

  const submit = async e => {
    e.preventDefault();
    try {
      const updateUser = {
        displayName,
        userBio,
        avatar
      };

      if (updateUser.displayName === "") {
        updateUser.displayName = userData.user.displayName;
      }
      if (updateUser.userBio === "") {
        updateUser.userBio = userData.user.userBio;
      }

      await Axios.post("http://localhost:5000/users/update", updateUser);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
    await alert("Profile updated!");
    window.location.reload();
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

            <ImageDrop imageSource={Avatar} />

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
