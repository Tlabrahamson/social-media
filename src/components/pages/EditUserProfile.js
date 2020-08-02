import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function EditUserProfile() {
  const { userData } = useContext(UserContext);

  if (userData.user) {
    return (
      <div className="page">
        <div className="profile-card">
          <h2>{userData.user.displayName}, care to edit some things?</h2>
          <h3>
            One of these days you will be able to edit your bio and user image.
          </h3>
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
