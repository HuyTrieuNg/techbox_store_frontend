// "use client";
// import { useState } from "react";
// import { useUser } from "@/hooks/useUser";
// import { userService } from "@/services/userService";

// export default function ProfilePage() {
//   const userId = 1; // giả sử đang login user id = 1
//   const { user, loading, error, setUser } = useUser(userId);
//   const [saving, setSaving] = useState(false);

//   if (loading) return <p>Loading...</p>;
//   if (error || !user) return <p>Error: {error}</p>;

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const updated = await userService.updateUser(user.id, {
//         username: user.username,
//         email: user.email,
//       });
//       setUser(updated);
//       alert("Profile updated successfully!");
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Profile</h1>
//       <form onSubmit={handleSave}>
//         <div>
//           <label>Username: </label>
//           <input
//             type="text"
//             value={user.username}
//             onChange={(e) => setUser({ ...user, username: e.target.value })}
//           />
//         </div>
//         <div>
//           <label>Email: </label>
//           <input
//             type="email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//           />
//         </div>
//         <button type="submit" disabled={saving}>
//           {saving ? "Saving..." : "Save"}
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";

interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
  postal_code?: string;
  is_default: boolean;
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  addresses?: Address[];
}

export default function ProfilePage() {
  const { user: authUser, isLoading: authLoading } = useAuthContext();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect nếu chưa login
  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/login');
    }
  }, [authUser, authLoading, router]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!authUser) return;
      
      try {
        setLoading(true);
        const profile = await api.get<UserProfile>('/users/me');
        setUser(profile);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUser]);

  if (authLoading || loading) {
    return <p className="p-4">Loading...</p>;
  }

  if (error || !user) {
    return <p className="p-4 text-red-600">Error: {error || 'User not found'}</p>;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await api.put<UserProfile>('/users/me', {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
      setUser(updated);
      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error('Error updating profile:', err);
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleAddressChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    if (!user) return;
    const updatedAddresses = [...(user.addresses || [])];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value,
    };
    setUser({ ...user, addresses: updatedAddresses });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSave} className="space-y-6">
        {/* User Info */}
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Username (readonly)</label>
          <input
            type="text"
            value={user.username}
            disabled
            className="w-full border rounded p-2 mt-1 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email (readonly)</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border rounded p-2 mt-1 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            value={user.phoneNumber || ''}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            className="w-full border rounded p-2 mt-1"
            placeholder="Optional"
          />
        </div>

        {/* Addresses */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Addresses</h2>
          {user.addresses?.map((addr, index) => (
            <div
              key={addr.id}
              className="border rounded p-4 mb-4 bg-gray-50 space-y-2"
            >
              <div>
                <label className="block text-sm font-medium">Street</label>
                <input
                  type="text"
                  value={addr.street}
                  onChange={(e) =>
                    handleAddressChange(index, "street", e.target.value)
                  }
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">City</label>
                <input
                  type="text"
                  value={addr.city}
                  onChange={(e) =>
                    handleAddressChange(index, "city", e.target.value)
                  }
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Country</label>
                <input
                  type="text"
                  value={addr.country}
                  onChange={(e) =>
                    handleAddressChange(index, "country", e.target.value)
                  }
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Postal Code</label>
                <input
                  type="text"
                  value={addr.postal_code || ""}
                  onChange={(e) =>
                    handleAddressChange(index, "postal_code", e.target.value)
                  }
                  className="w-full border rounded p-2 mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={addr.is_default}
                  onChange={(e) =>
                    handleAddressChange(index, "is_default", e.target.checked)
                  }
                />
                <label className="text-sm">Default Address</label>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
