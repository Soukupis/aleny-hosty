import React, { useState } from "react";
import { Modal, Button, Input, Form, Message } from "semantic-ui-react";
import { Formik } from "formik";
import db from "../../../firebase";

const AddWaterDemandModal = ({ triggerComponent, setAdding }) => {
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
      <Modal.Header>Přidání nároku na vodu</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Formik
            initialValues={{ waterDemand: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.waterDemand) {
                errors.waterDemand = "Pole nesmí být prázdné";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setAdding(true);
              db.firestore()
                .collection("waterDemands")
                .doc()
                .set({
                  demand: values.waterDemand,
                  lastChange: new Date(),
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
                    name="waterDemand"
                    control={Input}
                    label="Nárok na slunce"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.size}
                  />
                </Form.Group>
                {errors.waterDemand &&
                touched.waterDemand &&
                errors.waterDemand ? (
                  <Message negative>
                    <Message.Header>{errors.waterDemand}</Message.Header>
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
export default AddWaterDemandModal;
