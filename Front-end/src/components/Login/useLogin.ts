import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers, loginUser } from "../../utils/apiPath";
import { useUserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

interface ILoginData {
  email: string;
  password: string;
}

interface ILoginErrors {
  email?: string;
  password?: string;
}

const useLogin = () => {
  const [formData, setFormData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ILoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUsers] = useState();

  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ILoginErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ILoginErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});


    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      // Replace 'user/login' with your actual login endpoint
      const response = await axios.post(`${baseUrl}/${loginUser}`, loginData);

      console.log("Login successful:", response.data.user);

      // Show success toast
      toast.success("Login successful! Welcome back!");

      setIsSuccess(true);
      navigate("/");

      // Store user data in localStorage or context
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Update the user context
        setUser(response.data.user);
      }

      // Reset form after successful login
      setFormData({
        email: "",
        password: "",
      });
    } catch (error: unknown) {
      console.error("Login error:", error);

      // Handle different types of errors
      if (error && typeof error === "object" && "response" in error) {
        // Server responded with error status
        const serverError = (
          error as {
            response: {
              data: {
                message?: string;
                errors?: Array<{ field?: string; message?: string }>;
              };
            };
          }
        ).response.data;

        if (serverError.message) {
          setErrors({ email: serverError.message });
          toast.error(serverError.message);
        } else if (serverError.errors) {
          // Handle validation errors from server
          const serverErrors: ILoginErrors = {};
          serverError.errors.forEach(
            (err: { field?: string; message?: string }) => {
              if (err.field && err.message) {
                serverErrors[err.field as keyof ILoginErrors] = err.message;
              }
            }
          );
          setErrors(serverErrors);
          // Show first error as toast
          const firstError = Object.values(serverErrors)[0];
          if (firstError) {
            console.error(firstError);
          }
        }
      } else if (error && typeof error === "object" && "request" in error) {
        // Network error
        const errorMessage = "Network error. Please check your connection.";
        setErrors({ email: errorMessage });
      } else {
        // Other error
        const errorMessage = "An unexpected error occurred. Please try again.";
        setErrors({ email: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { userId } = useParams();

  const getUser = async () => {
    const result = await axios.get(`${baseUrl}/${getUsers}${userId}`);
    console.log("users===>", result);

    setUsers(result.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    formData,
    errors,
    user,
    getUser,
    isLoading,
    isSuccess,
    handleInputChange,
    handleLogin,
  };
};

export default useLogin;
