import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login: React.FC<{
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const loginFunciton = () => {
    if (userName.trim()) {
      setIsLoggedIn(true);
      navigate("/students");
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <div>Please Do Login</div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
          <button onClick={loginFunciton}>Login</button>
        </>
      ) : (
        <div>You are already logged in</div>
      )}
    </>
  );
};

export default Login;
