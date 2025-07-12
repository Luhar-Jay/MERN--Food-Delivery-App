import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";

interface IUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  cartData: unknown;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IUserResponse {
  success: boolean;
  user: IUser;
}

const useUser = (userId?: string) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await axios.get<IUserResponse>(
        `${baseUrl}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response);

      setUser(response.data.user);
    } catch (err: unknown) {
      console.error("Error fetching user:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch user data");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  return {
    user,
    isLoading,
    error,
    fetchUser,
  };
};

export default useUser;
