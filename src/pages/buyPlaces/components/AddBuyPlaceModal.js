import React, { useState } from "react";
import { Modal, Button, Input, Form, Message } from "semantic-ui-react";
import { Formik } from "formik";
import db from "../../../firebase";

const AddBuyPlaceModal = ({ triggerComponent, setAdding, setError }) => {
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
      <Modal.Header>Přidání pořizovacího místa</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Formik
            initialValues={{ place: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.place) {
                errors.place = "Pole nesmí být prázdné";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setAdding(true);
              db.firestore()
                .collection("buyPlaces")
                .doc()
                .set({
                  place: values.place,
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
                    name="place"
                    control={Input}
                    label="Pořizovací místo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.place}
                  />
                </Form.Group>
                {errors.place && touched.place && errors.place ? (
                  <Message negative>
                    <Message.Header>{errors.place}</Message.Header>
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
export default AddBuyPlaceModal;
