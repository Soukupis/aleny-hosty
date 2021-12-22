import React, { useState } from "react";
import { Modal, Button, Input, Form, Message } from "semantic-ui-react";
import { Formik } from "formik";
import db from "../../../firebase";

const AddColorModal = ({ triggerComponent, setAdding, setError }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerComponent}
      centered
      size="small"
    >
      <Modal.Header>Přidání velikosti</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Formik
            initialValues={{ color: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.color) {
                errors.color = "Pole nesmí být prázdné";
              }
              if (/^[0-9]*$/.test(values.color)) {
                errors.color = "Pole nesmí obsahovat číslice";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setAdding(true);
              db.firestore()
                .collection("colors")
                .doc()
                .set({
                  color: values.color,
                  lastChange: new Date(),
                })
                .catch((error) => setError(error))
                .then((response) => {
                  setSubmitting(false);
                  setOpen(false);
                  setAdding(false);
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
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                  <Form.Field
                    name="color"
                    control={Input}
                    label="Barva"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.color}
                  />
                </Form.Group>
                {errors.color && touched.color && errors.color ? (
                  <Message negative>
                    <Message.Header>{errors.color}</Message.Header>
                  </Message>
                ) : (
                  ""
                )}

                <Button type="submit" disabled={isSubmitting} positive>
                  Přidat
                </Button>
                <Button negative onClick={() => setOpen(false)}>
                  Zrušit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};
export default AddColorModal;
