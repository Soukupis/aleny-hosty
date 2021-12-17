import React, { useState } from "react";
import { Modal, Button, Input, Form, Select } from "semantic-ui-react";
import db, { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";

import { Formik } from "formik";

const AddHostaModal = ({
  triggerComponent,
  sizes,
  waterDemands,
  sunDemands,
  locations,
  colors,
  setAdding,
  setError,
}) => {
  const [open, setOpen] = useState(false);

  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((images) => [...images, newImage]);
    }
  };

  const handleUpload = (id) => {
    const promises = [];
    images.forEach((images) => {
      const uploadTask = storage.ref(`images/${id}/${images.name}`).put(images);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setError(error);
        },
        async () => {
          await storage.ref(`images/${id}`).child(images.name).getDownloadURL();
        }
      );
    });
    Promise.all(promises).catch((error) => setError(error));
  };
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={triggerComponent}
        centered
        size="small"
      >
        <Modal.Header>Přidání nové hosty</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Formik
              initialValues={{
                name: "",
                latinName: "",
                size: "",
                location: "",
                color: "",
                sunDemand: "",
                waterDemand: "",
                buyDate: "",
                registrationNumber: "",
                lastChange: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.size) {
                  errors.size = "Pole nesmí být prázdné";
                }
                if (!values.name) {
                  errors.name = "Pole nesmí být prázdné";
                }
                if (!values.latinName) {
                  errors.latinName = "Pole nesmí být prázdné";
                }
                if (!values.location) {
                  errors.location = "Pole nesmí být prázdné";
                }
                if (!values.color) {
                  errors.color = "Pole nesmí být prázdné";
                }
                if (!values.sunDemand) {
                  errors.sunDemand = "Pole nesmí být prázdné";
                }
                if (!values.waterDemand) {
                  errors.waterDemand = "Pole nesmí být prázdné";
                }
                if (!values.buyDate) {
                  errors.buyDate = "Pole nesmí být prázdné";
                }
                if (!values.registrationNumber) {
                  errors.registrationNumber = "Pole nesmí být prázdné";
                }
                console.log(errors);
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setAdding(true);
                const id = uuid();
                handleUpload(id);
                db.firestore()
                  .collection("hostas")
                  .doc()
                  .set({
                    hostaId: id,
                    name: values.name,
                    latinName: values.latinName,
                    size: values.size,
                    location: values.location,
                    color: values.color,
                    sunDemand: values.sunDemand,
                    waterDemand: values.waterDemand,
                    buyDate: new Date(),
                    registrationNumber: values.registrationNumber,
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
                setFieldValue,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => {
                const handleChange = (e, { name, value }) =>
                  setFieldValue(name, value);
                return (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group widths="equal">
                      <Form.Field
                        control={Input}
                        label="Název"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <Form.Field
                        control={Input}
                        label="Latinský název"
                        name="latinName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.latinName}
                      />
                      <Form.Field
                        control={Input}
                        label="Evidenční číslo"
                        name="registrationNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.registrationNumber}
                      />
                    </Form.Group>
                    <Form.Group widths="equal">
                      <Form.Field
                        control={Select}
                        name="waterDemand"
                        label="Nárok na vláhu"
                        placeholder="Vyberte nárok na vláhu..."
                        options={waterDemands}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.waterDemand}
                      />
                      <Form.Field
                        control={Select}
                        label="Nárok na slunce"
                        name="sunDemand"
                        placeholder="Vyberte nárok na slunce..."
                        options={sunDemands}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sunDemand}
                      />
                    </Form.Group>

                    <Form.Group widths="equal">
                      <Form.Field
                        control={Select}
                        label="Umístění"
                        name="location"
                        placeholder="Vyberte umístění..."
                        options={locations}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.location}
                      />
                      <Form.Field
                        control={Select}
                        label="Velikost (cm)"
                        name="size"
                        placeholder="Vyberte velikost..."
                        options={sizes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.size}
                      />
                      <Form.Field
                        control={Select}
                        label="Barva"
                        name="color"
                        placeholder="Vyberte barvu..."
                        options={colors}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.color}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Field
                        control={Input}
                        label="Datum pořízení"
                        name="buyDate"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.buyDate}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Field>
                        <Input
                          label="Fotky"
                          type="file"
                          multiple
                          onChange={handleImageChange}
                        />
                      </Form.Field>
                    </Form.Group>

                    <Button type="submit" disabled={isSubmitting} positive>
                      Submit
                    </Button>
                    <Button negative onClick={() => setOpen(false)}>
                      Zrušit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default AddHostaModal;
