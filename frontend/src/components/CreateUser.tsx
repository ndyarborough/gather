"use client";

import { ToastContext } from "@/context/ToastContext";
import { useContext, useState } from "react";

interface UserFormData {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  profilePic?: File | null;
}

export default function CreateUser() {
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  });

  const toast = useContext(ToastContext);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePic: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      toast?.setToast('Passwords do not match', 'error');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("password", formData.password);
    if (formData.profilePic) {
      formDataToSend.append("profilePic", formData.profilePic);
    }

    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        body: formDataToSend,
      });
      if (!response.ok) return toast?.setToast('Unexpected Server Response', 'error');
      // If response from regitering user is as expected
      toast?.setToast('User Account Created', 'success')
      return response;
    } catch (error) {
      toast?.setToast(`${error} Server may be down`, 'error');
    }
  };

  return (
    <form className="shadow-primary shadow-sm rounded-lg p-4" onSubmit={handleSubmit}>
      <h1>Create User</h1>
      <input
        className="rounded-sm p-2 my-2 block"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        className="rounded-sm p-2 my-2 block"
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        className="rounded-sm p-2 my-2 block"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        className="rounded-sm p-2 my-2 block"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <input
        className="rounded-sm p-2 my-2 block"
        type="file"
        name="profilePic"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button type="submit" className="btn">
        Create User
      </button>
    </form>
  );
}   