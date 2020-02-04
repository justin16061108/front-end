import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = props => {

  const Login = ({ errors, touched, status }) => {
    const [login, setLogin] = useState([]);
    useEffect(() => {
      console.log("status has changed", status);
      status && setLogin(login => [...login, status]);
    }, [status]);

  return (
      <div>
          <h2>Welcome Back!</h2>
          <Form>
              <label htmlFor="username">username</label>
              <Field
                  id="username"
                  type="text"
                  placeholder="username"
                  name="username"
              />
                {touched.username && errors.username && <p 
                className="errors">{errors.username}</p>}
              <label htmlFor="password">password</label>
              <Field
                  id="password"
                  type="text"
                  placeholder="password"
                  name="password"
              />
              {touched.password && errors.password && <p 
                className="errors">{errors.password}</p>}
              <button type="submit">Login</button>
              
          </Form>
    
      </div>
  );
}

const FormikLogin = withFormik({
  mapPropsToValues({ username, password }){
      return {
          username: username || "",
          password: ""
      };
  },
  validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required()
  }),
  handleSubmit(values, {setStatus}){
      console.log("submitting", values);
      axios.post('https://reqres.in/api/users', values)
      .then(res => {
          console.log('success', res)
          setStatus(res.data)
      })
      .catch(err => console.log(err.response));
  }
})(Login);
export default FormikLogin;