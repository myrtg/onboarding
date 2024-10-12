"use client";

import { useState, useEffect } from "react";

export default function ProfileCompletion() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    gender: "",
    email: "",
    service: "",
    position: "",
    site: "",
    employment_status: "",
    account_status: "",
    invitation_status: "",
    creation_date: "",
    role: "",
    ou: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch the user data from the PHP back-end when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/get-profile");
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setFormData(data); // Populate the form with the data received from the backend
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send updated data to PHP back-end to update the user profile in the database
    const res = await fetch("/api/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Profile successfully updated!");
      window.location.href = "/profile"; // Redirect after successful update
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Grayed-out, non-editable fields */}
        <fieldset disabled>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              readOnly
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              readOnly
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              readOnly
            />
          </div>
          <div>
            <label>Gender</label>
            <input type="text" name="gender" value={formData.gender} readOnly />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} readOnly />
          </div>
        </fieldset>

        {/* Editable fields */}
        <div>
          <label>Service</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Site</label>
          <input
            type="text"
            name="site"
            value={formData.site}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Employment Status</label>
          <select
            name="employment_status"
            value={formData.employment_status}
            onChange={handleChange}
          >
            <option value="En congé">En congé</option>
            <option value="Fin de contrat">Fin de contrat</option>
            <option value="Intégration des nouvelles recrues">
              Intégration des nouvelles recrues
            </option>
            <option value="Travail">Travail</option>
          </select>
        </div>
        <div>
          <label>Account Status</label>
          <select
            name="account_status"
            value={formData.account_status}
            onChange={handleChange}
          >
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
            <option value="suspendu">suspendu</option>
          </select>
        </div>
        <div>
          <label>Invitation Status</label>
          <select
            name="invitation_status"
            value={formData.invitation_status}
            onChange={handleChange}
          >
            <option value="invité">invité</option>
            <option value="invitation acceptée">invitation acceptée</option>
            <option value="non invité">non invité</option>
          </select>
        </div>
        <div>
          <label>Creation Date</label>
          <input
            type="text"
            name="creation_date"
            value={formData.creation_date}
            readOnly
          />
        </div>
        <div>
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="RH">RH</option>
            <option value="Employée">Employée</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div>
          <label>OU</label>
          <input
            type="text"
            name="ou"
            value={formData.ou}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Complete Profile</button>
      </form>
    </div>
  );
}
