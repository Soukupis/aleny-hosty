import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, Message } from "semantic-ui-react";
import { Formik } from "formik";
import db from "../../../firebase";

const AddSizeModal = ({ triggerComponent, setAdding, setError }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {});

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
            initialValues={{ size: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.size) {
                errors.size = "Pole nesmí být prázdné";
              }
              if (!/^[0-9]*$/.test(values.size)) {
                errors.size = "Pole musí obsahovat pouze číslice";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setAdding(true);
              db.firestore()
                .collection("sizes")
                .doc()
                .set({
                  size: values.size,
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
                    name="size"
                    control={Input}
                    label="Velikost"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.size}
                  />
                </Form.Group>
                {errors.size && touched.size && errors.size ? (
                  <Message negative>
                    <Message.Header>{errors.size}</Message.Header>
                  </Message>
                ) : (
                  ""
                )}

                <Button type="submit" disabled={isSubmitting} positive>
                  Submit
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
export default AddSizeModal;
