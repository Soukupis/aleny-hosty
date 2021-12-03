import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, Message } from "semantic-ui-react";
import { Formik } from "formik";
import db from "../../../firebase";

const AddSizeModal = ({ triggerComponent }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {};

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
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              db.firestore()
                .collection("sizes")
                .doc()
                .set({
                  size: values.size,
                })
                .then((response) => {
                  console.log(response);
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
      <Modal.Actions>
        <Button negative onClick={() => setOpen(false)}>
          Zrušit
        </Button>
        <Button onClick={() => handleSubmit} positive>
          Vytvořit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default AddSizeModal;
