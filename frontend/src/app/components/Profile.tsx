"use client";

interface ProfileProps {
  user: any;
}

export default function Profile({ user }: ProfileProps) {
  if (!user) {
    return <div className="border-2 border-primary-color p-4">Not logged in</div>;
  }

  return (
    <div className="border-2 border-primary-color p-4">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.profilePic && <img src={user.profilePic} alt="Profile" className="w-20 h-20 rounded-full" />}

      <button className="btn">Sign out</button>
    </div>
  );
}
