import { useEffect, useState } from "react"
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

const ListTodos= () => {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState();
  const { username } = useAuth();
  const navigate = useNavigate();

  const refreshTodos = () => {
    retrieveAllTodosForUsernameApi(username)
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error))
      .finally(() => console.log('finished'));
  };

  const deleteTodo = (id) => {
    deleteTodoApi(username, id)
      .then(() => {
        setMessage('Successfully deleted!')  
        refreshTodos()
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('finished'))
  }

  const updateTodo = (id) => {
    navigate(`/todo/${id}`);
  }

  const addNewTodo = () => {
    navigate('/todo/-1');
  }

  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <div className="container">
      <h3>Things you want to do:</h3>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 && todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                <td>{todo.targetDate.toString()}</td>
                <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                <td><button className="btn btn-warning" onClick={() => updateTodo(todo.id)}>Update</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
    </div>
  )
}

export default ListTodos