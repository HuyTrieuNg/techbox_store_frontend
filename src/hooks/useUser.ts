import { useEffect, useState } from "react";
import { User } from "@/features/user";
import { userService } from "@/services/userService";

export function useUser(id: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    userService.getUserById(id)
      .then(setUser)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { user, loading, error, setUser };
}