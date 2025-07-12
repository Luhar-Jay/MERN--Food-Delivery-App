import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { createUser } from "../../utils/apiPath";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface IRegisterData {
  userName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IRegisterErrors {
  userName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const useRegister = () => {
  const [formData, setFormData] = useState<IRegisterData>({
    userName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof IRegisterErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: IRegisterErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const registrationData = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(
        `${baseUrl}/${createUser}`,
        registrationData
      );

      console.log("Registration successful:", response.data);
      setIsSuccess(true);
      navigate("/login");
      toast.success("User register successfully")

      // Reset form after successful registration
      setFormData({
        userName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Registration error:", error);

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const serverError = error.response.data;
        if (serverError.message) {
          setErrors({ email: serverError.message });
        } else if (serverError.errors) {
          // Handle validation errors from server
          const serverErrors: IRegisterErrors = {};
          serverError.errors.forEach((err: any) => {
            if (err.field && err.message) {
              serverErrors[err.field as keyof IRegisterErrors] = err.message;
            }
          });
          setErrors(serverErrors);
        }
      } else if (error.request) {
        // Network error
        setErrors({ email: "Network error. Please check your connection." });
      } else {
        // Other error
        setErrors({ email: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0)
      return { strength: 0, color: "bg-gray-200", text: "" };
    if (password.length < 6)
      return { strength: 1, color: "bg-red-500", text: "Weak" };
    if (password.length < 8)
      return { strength: 2, color: "bg-yellow-500", text: "Fair" };
    if (password.length < 10)
      return { strength: 3, color: "bg-blue-500", text: "Good" };
    return { strength: 4, color: "bg-green-500", text: "Strong" };
  };

  return {
    formData,
    errors,
    isLoading,
    isSuccess,
    handleInputChange,
    handleRegister,
    getPasswordStrength,
  };
};

export default useRegister;
