import { useEffect, useState } from "react";
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

const Todo = () => {
  const [description, setDescription] = useState();
  const [targetDate, setTargetDate] = useState();
  const { username } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const retrieveTodo = () => {
    if (id != -1) {
      retrieveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description)
          setTargetDate(response.data.targetDate)
        })
        .catch((error) => console.log(error))
        .finally(() => console.log('finished'));
    } else return;
  }

  const onSubmit = (values) => {
    const todo = {
      id,
      username,
      description: values.description,
      targetDate: values.targetDate,
      done: false
    }

    if (id == -1) {
      createTodoApi(username, todo)
        .then((response) => {
          console.log(response)
          navigate('/todos');
        })
        .catch((error) => console.log(error))
        .finally(() => console.log('done'));
    } else {
      updateTodoApi(username, id, todo)
        .then((response) => {
          console.log(response);
          navigate('/todos');
        })
        .catch((error) => console.log(error))
        .finally(() => console.log('updated'));
    }

  }

  const validate = (values) => {
    const errors = {};

    if (values.description.length < 5) {
      errors.description = "Enter at least 5 characters";
    }

    if (values.targetDate === null || values.targetDate === '' || !moment(targetDate).isValid()) {
      errors.targetDate = "Enter valid date";
    }

    return errors;
  }

  useEffect(() => {
    retrieveTodo();
  }, [id]);

  return (
    <div className="container">
      <h3>Enter Todo details:</h3>

      <Formik
        initialValues={{ description, targetDate }}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {() => (
          <Form>
            <ErrorMessage
              name="description"
              className="alert alert-danger"
              component="div"  
            />
            <ErrorMessage
              name="targetDate"
              className="alert alert-danger"
              component="div"  
            />
            <fieldset className="form-group">
              <label>Description</label>
              <Field type="text" className="form-control" name="description"  />
            </fieldset>
            <fieldset className="form-group">
              <label>Target Date</label>
              <Field type="date" className="form-control" name="targetDate" />
            </fieldset>
            <div>
              <button type="submit" className="btn btn-success m-5">Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Todo