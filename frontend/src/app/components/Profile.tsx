"use client";

import { useState } from "react";

interface ProfileProps {
  user: any;
  setUser: (user: any) => void;
}

export default function Profile({ user, setUser }: ProfileProps) {
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);

  const handleSignOut = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setUser(null); // Reset user state
  };

  const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewProfilePic(file);
      // Prepare the FormData to send to the server
      const formData = new FormData();
      formData.append('profilePic', file);
  
      try {
        const response = await fetch(`http://localhost:3001/api/users/${user.userId}/uploadProfilePic`, {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) throw new Error("Profile picture upload failed");
  
        const data = await response.json();
        if (data.success) {
          // Update the user state with the new profile picture URL
          setUser({ ...user, profilePic: data.profilePicUrl });
        } else {
          console.error("Profile picture upload failed");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };
  

  // Check if user exists and has a profilePic
  const profilePicUrl = newProfilePic
    ? URL.createObjectURL(newProfilePic)
    : user?.profilePic
    ? `http://localhost:3001/${user.profilePic}` // Use the profile pic path from the server
    : '/imgs/empty_profile.jpg'; // Default image

  if (!user) {
    return <div className="border-2 border-primary-color p-4">Not logged in</div>;
  }

  return (
    <div className="border-2 border-primary-color p-4">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div>
        <img
          src={profilePicUrl} // Use new profile picture or default image
          alt="Profile Picture"
          className="w-20 h-20 rounded-full cursor-pointer"
          onClick={() => document.getElementById("profilePicInput")?.click()} // Trigger file input when clicking on image
        />
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          className="hidden" // Hide the file input
          onChange={handleProfilePicChange} // Handle file upload
        />
      </div>
      <button className="btn" onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
