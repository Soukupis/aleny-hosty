import React, { useState } from "react";
import { Modal, Button, Input, Form, Message } from "semantic-ui-react";
import { Formik } from "formik";
import db from "../../../firebase";

const AddSizeModal = ({ triggerComponent, setAdding, setError }) => {
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
      <Modal.Header>Přidání polohy</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Formik
            initialValues={{ location: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.location) {
                errors.location = "Pole nesmí být prázdné";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setAdding(true);
              db.firestore()
                .collection("locations")
                .doc()
                .set({
                  location: values.location,
                  lastChange: new Date(),
                })
                .catch((error) => {
                  setError(error);
                })
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
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                  <Form.Field
                    name="location"
                    control={Input}
                    label="Poloha"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.location}
                  />
                </Form.Group>
                {errors.location && touched.location && errors.location ? (
                  <Message negative>
                    <Message.Header>{errors.location}</Message.Header>
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
export default AddSizeModal;
