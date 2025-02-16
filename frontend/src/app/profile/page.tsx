"use client";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Image from "next/image";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  console.log(user)
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    const formData = new FormData();
    formData.append("profilePic", file);
    console.log(file)
    try {
      const response = await fetch(`http://localhost:3001/api/users/${user.id}/uploadProfilePic`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data)
      if (response.ok && data.profilePicUrl) {
        setUser((prevUser) => prevUser && { ...prevUser, profilePic: data.profilePicUrl });
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  if (!user) return <div className="border-2 border-primary-color p-4">Not logged in</div>;

  return (
    <div className="border-2 w-full border-primary-color p-4">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div>
        {user.profilePic !== '/uploads/undefined' ? (
          <Image
            src={`http://localhost:3001/${user.profilePic}`}
            alt="Profile Picture"
            width={200}
            height={200}
            className="w-20 h-20 rounded-full cursor-pointer"
            onClick={() => document.getElementById("profilePicInput")?.click()}
          />
        ) : (
          <p>No profile picture</p>
        )}
        <input id="profilePicInput" type="file" accept="image/*" onChange={handleProfilePicChange} />
      </div>
      <button className="btn" onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
