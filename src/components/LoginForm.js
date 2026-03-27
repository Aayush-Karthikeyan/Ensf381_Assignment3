import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayStatus from "./DisplayStatus";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        navigate("/flavors");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, navigate]);

  function handleLogin(e) {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setMessageType("error");
      setMessage("Username and password cannot be empty.");
      return;
    }

    if (password.length < 8) {
      setMessageType("error");
      setMessage("Password must be at least 8 characters.");
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => {
        const matchedUser = users.find(
          (user) => user.username === username && user.email === password
        );
        if (matchedUser) {
          setMessageType("success");
          setMessage("Login successful! Redirecting...");
          setLoginSuccess(true);
        } else {
          setMessageType("error");
          setMessage("Invalid username or password.");
        }
      })
      .catch(() => {
        setMessageType("error");
        setMessage("Error connecting to server. Please try again.");
      });
  }

  return (
    <div className="main-section">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <br />
        <a href="#forgot">Forgot Password?</a>
        {message && <DisplayStatus type={messageType} message={message} />}
      </form>
    </div>
  );
}

export default LoginForm;
