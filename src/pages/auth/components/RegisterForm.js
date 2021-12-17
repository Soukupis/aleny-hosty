import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {
  Segment,
  Form,
  Modal,
  Button,
  Input,
  Message,
} from "semantic-ui-react";
import { Formik } from "formik";
import db from "../../../firebase";

const RegisterForm = () => {
  const [error, setError] = useState("");

  const { register } = useAuth();

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
        initialValues={{ email: "", password: "", confirmedPassword: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Pole nesmí být prázdné";
          }
          if (!values.password) {
            errors.password = "Pole nesmí být prázdné";
          }
          if (!values.confirmedPassword) {
            errors.confirmedPassword = "Pole nesmí být prázdné";
          }
          if (values.password !== values.confirmedPassword) {
            errors.password = "Hesla se musí shodovat";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          db.firestore()
            .collection("users")
            .doc()
            .set({
              username: values.email,
              role: "USER",
            })
            .catch((error) => setError(error))
            .then((response) => {
              setSubmitting(false);
              register(values.email, values.password);
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
          <Form size="large" onSubmit={handleSubmit}>
            <h4 className="ui dividing header">Registrace</h4>

            <Form.Field
              icon="envelope"
              name="email"
              control={Input}
              placeholder="Zadejte e-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.color}
            />
            <Form.Field
              icon="lock"
              name="password"
              type="password"
              control={Input}
              placeholder="Zadejte heslo"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.color}
            />
            <Form.Field
              icon="lock"
              name="confirmedPassword"
              type="password"
              control={Input}
              placeholder="Potvrďte heslo "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.color}
            />

            {errors.location && touched.location && errors.location ? (
              <Message negative>
                <Message.Header>{errors.location}</Message.Header>
              </Message>
            ) : (
              ""
            )}

            <Segment>
              Už účet máte?
              <Link to="/login"> Přihlášení</Link>
            </Segment>
            <Button type="submit" disabled={isSubmitting} positive>
              Registrace
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
