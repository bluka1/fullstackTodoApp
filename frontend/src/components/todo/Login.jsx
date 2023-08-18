import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

const Login = () => {
  const [username, setUsername] = useState('Luka');
  const [password, setPassword] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();

  const usernameInputHandler = (e) => {
    setUsername(e.target.value)
  }

  const passwordInputHandler = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async () => {
    if (await login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <div className="login">
      {showErrorMessage && <div className="errorMessage">Auth failed. Check your credentials!</div>}
      <div className="loginForm">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={username} onChange={usernameInputHandler} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={passwordInputHandler} />
        </div>
        <div>
          <button type="submit" name="login" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login