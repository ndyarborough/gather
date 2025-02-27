'use client';
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface UserInfoProps {
  user: {
    fullName: string;
    email: string;
    profilePic?: string;
    id: string;
  } | null;
  isOwnProfile: boolean;
  handleProfilePicChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInfo: FC<UserInfoProps> = ({ user, isOwnProfile, handleProfilePicChange }) => {
  if (!user) return null;
  return (
    <div className="p-10 flex flex-row gap-4">
      {user.profilePic && user.profilePic !== "/uploads/undefined" ? (
        <Image
          src={`http://localhost:3001/${user.profilePic}`}
          alt="Profile Picture"
          width={200}
          height={200}
          className="w-50 h-50 rounded-full cursor-pointer object-cover"
          onClick={() => isOwnProfile && document.getElementById("profilePicInput")?.click()}
        />
      ) : (
        <p>No profile picture</p>
      )}
      {isOwnProfile && (
        <input
          id="profilePicInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePicChange}
        />
      )}
      <div className="space-y-1">
        <p>{user.fullName}</p>
        <p>{user.email}</p>
        <Link href={`/dashboard/messages/${user.id}`} className="btn">
          Send Message
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
