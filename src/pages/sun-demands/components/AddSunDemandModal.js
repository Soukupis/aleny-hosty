import React, { useState } from "react";
import { Modal, Button, Input, Form, Message } from "semantic-ui-react";
import { Formik } from "formik";
import db from "../../../firebase";

const AddSunDemandModal = ({ triggerComponent, setAdding, setError }) => {
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
      <Modal.Header>Přidání nároku na slunce</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Formik
            initialValues={{ sunDemand: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.sunDemand) {
                errors.sunDemand = "Pole nesmí být prázdné";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setAdding(true);
              db.firestore()
                .collection("sunDemands")
                .doc()
                .set({
                  demand: values.sunDemand,
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
                    name="sunDemand"
                    control={Input}
                    label="Nárok na slunce"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.size}
                  />
                </Form.Group>
                {errors.sunDemand && touched.sunDemand && errors.sunDemand ? (
                  <Message negative>
                    <Message.Header>{errors.sunDemand}</Message.Header>
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
export default AddSunDemandModal;
