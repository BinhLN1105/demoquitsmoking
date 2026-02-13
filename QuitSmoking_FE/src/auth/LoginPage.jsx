import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css"; // Import CSS mới

const LoginPage = () => {
  const actualNavigate = useNavigate(); // Vẫn giữ để có thể dùng nếu cần
  const {
    login,
    googleLogin,
    loading: authLoading,
    error: authError,
    isAuthenticated,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [localError, setLocalError] = useState("");
  const [formProcessing, setFormProcessing] = useState(false);

  // States để theo dõi lỗi validation cho từng trường
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handleRememberMeChange không cần làm gì nếu bạn không lưu trạng thái này
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe); // Thêm logic để cập nhật trạng thái
  };

  const validateUsername = (inputUsername) => {
    if (!inputUsername.trim()) {
      return "Tài khoản không được để trống.";
    }
    return "";
  };

  const validatePassword = (inputPassword) => {
    if (!inputPassword.trim()) {
      return "Mật khẩu không được để trống.";
    }
    // Có thể thêm các điều kiện khác cho mật khẩu ở đây (ví dụ: độ dài tối thiểu)
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setUsernameError(""); // Reset lỗi username
    setPasswordError(""); // Reset lỗi password
    setFormProcessing(true);

    const uError = validateUsername(usernameInput);
    const pError = validatePassword(passwordInput);

    if (uError) {
      setUsernameError(uError);
    }
    if (pError) {
      setPasswordError(pError);
    }

    if (uError || pError) {
      setFormProcessing(false);
      return;
    }

    try {
      await login({ username: usernameInput, password: passwordInput });
    } catch (err) {
      const errorMessage =
          authError || err.message || "Tài khoản hoặc mật khẩu không đúng.";
      setLocalError(errorMessage);
    } finally {
      setFormProcessing(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLocalError("");
    setFormProcessing(true);

    try {
      await googleLogin(credentialResponse.credential);
    } catch (err) {
      const errorMessage =
          authError || err.message || "Đăng nhập với Google thất bại.";
      setLocalError(errorMessage);
    } finally {
      setFormProcessing(false);
    }
  };

  const handleGoogleError = (errorResponse) => {
    console.error("LoginPage: Đăng nhập với Google thất bại:", errorResponse);
    setLocalError("Đăng nhập với Google thất bại. Vui lòng thử lại.");
    setFormProcessing(false);
  };

  useEffect(() => {
    document.getElementById("title").innerText = "Đăng Nhập"; // Cập nhật tiêu đề trang
  }, []);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      console.log(
          "LoginPage useEffect: Đã xác thực thành công. Đang điều hướng bằng window.location.replace."
      );
      window.location.replace("/");
    }
  }, [isAuthenticated, authLoading]);

  return (
      <div
          className="min-h-screen w-full flex items-center justify-center bg-neutral-100 px-4 relative"
          style={{
            // Bạn có thể giữ background image hoặc di chuyển nó vào CSS nếu muốn
            backgroundImage: "url('images/123123123.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "start",
          }}
      >
        {/* Demo credentials info box */}
        <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-4 max-w-xs text-sm">
          <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <span>🔑</span>
            <span>Tài khoản Demo</span>
          </div>
          <div className="space-y-2">
            <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
              <div className="font-medium text-blue-700 text-xs mb-1">Admin</div>
              <div className="text-gray-600 text-xs">
                <span className="font-mono">admin</span> / <span className="font-mono">123123123</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-2 border border-green-100">
              <div className="font-medium text-green-700 text-xs mb-1">Coach</div>
              <div className="text-gray-600 text-xs">
                <span className="font-mono">coach</span> / <span className="font-mono">123123123</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 login-container">
          {" "}
          {/* Thêm class login-container */}
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            ĐĂNG NHẬP
          </h1>

          <p className="text-center text-sm text-gray-600 mb-6 description">
            {" "}
            {/* Thêm class description */}
            Bạn chưa có tài khoản?{" "}
            <Link
                to="/register"
                className="text-blue-500 hover:underline cursor-pointer"
            >
              Tạo tài khoản ngay!
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            {(localError || authError) && (
                <div className="message error-message" role="alert">
                  {" "}
                  {/* Sử dụng class message và error-message */}
                  <span className="block sm:inline">{localError || authError}</span>
                </div>
            )}

            <div className="mb-4">
              <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tài khoản
              </label>
              <input
                  id="username"
                  type="text"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      usernameError ? "invalid" : ""
                  }`}
                  value={usernameInput}
                  onChange={(e) => {
                    setUsernameInput(e.target.value);
                    if (usernameError) setUsernameError(""); // Xóa lỗi khi người dùng bắt đầu gõ
                  }}
              />
              {usernameError && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {usernameError}
                  </p>
              )}
            </div>

            <div className="mb-4">
              <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                        passwordError ? "invalid" : ""
                    }`}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError(""); // Xóa lỗi khi người dùng bắt đầu gõ
                    }}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                  <i
                      className={`fas ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                      } text-gray-400`}
                  ></i>
                </button>
              </div>
              {passwordError && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {passwordError}
                  </p>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                />
                <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Duy trì đăng nhập
                </label>
              </div>
              <div className="text-sm">
                <Link
                    to="/recover-password"
                    className="text-blue-500 hover:underline cursor-pointer"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <button
                type="submit"
                className="primary-btn" // Sử dụng class primary-btn
                disabled={formProcessing || authLoading}
            >
              {formProcessing || authLoading ? "Đang xử lý..." : "Đăng Nhập"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Đăng Nhập Theo Phương Thức Khác
              </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
