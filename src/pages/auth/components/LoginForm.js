import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {
  Segment,
  Form,
  Input,
  Button,
  Message,
  Modal,
} from "semantic-ui-react";
import { Formik } from "formik";

const LoginForm = () => {
  const [error, setError] = useState(false);

  const { login } = useAuth();

  return (
    <>
      {error ? (
        <Modal size="tiny" open={!!error} onClose={() => setError(false)}>
          <Modal.Header>Chyba</Modal.Header>
          <Modal.Content>
            <p>{error}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setError(false)}>
              Zavřít
            </Button>
          </Modal.Actions>
        </Modal>
      ) : (
        ""
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Pole nesmí být prázdné";
          }
          if (!values.password) {
            errors.password = "Pole nesmí být prázdné";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          login(values.email, values.password)
            .catch((error) => {
              setError(error.message);
              values.email = "";
              values.password = "";
            })
            .then(() => {
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <h4 className="ui dividing header">Přihlášení</h4>
            <Form.Field
              name="email"
              control={Input}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Zadejte e-mail"
            />
            {errors.email && touched.email && errors.email ? (
              <Message negative>
                <Message.Header>{errors.email}</Message.Header>
              </Message>
            ) : (
              ""
            )}
            <Form.Field
              name="password"
              type="password"
              control={Input}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Zadejte heslo"
            />

            <div className="field">
              <Segment>
                Chcete si založit účet?
                <Link to="/register"> Registrace</Link>
              </Segment>
            </div>
            <Button
              fluid
              size="large"
              color="green"
              type="submit"
              disabled={isSubmitting}
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
