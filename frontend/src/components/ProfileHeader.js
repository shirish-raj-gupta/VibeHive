// src/components/ProfileHeader.js

export default function ProfileHeader({ user }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold">{user.name}'s Dashboard</h2>
      <p className="text-lg text-gray-500">Email: {user.email}</p>
    </div>
  );
}
