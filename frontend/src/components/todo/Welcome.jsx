import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { retrievePathVariable } from "./api/HelloWorldApiService";

const Welcome = () => {
  const [message, setMessage] = useState(null);
  const { username } = useParams();

  const callHelloWorldApi = () => {
    retrievePathVariable('Luka')
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.log(error))
      .finally(() => console.log('cleanup'))
  }

  return (
    <div className="welcomeComponent">
      <h2>Welcome {username}!</h2>
      <p>Manage your todos <Link to="/todos">here</Link></p>
      <button className="btn btn-success m-5" onClick={callHelloWorldApi}>Call hello world API</button>
      <div className="text-info">{ message }</div>
    </div>
  )
}

export default Welcome;