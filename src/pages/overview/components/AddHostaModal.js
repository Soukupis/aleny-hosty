import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Form, Select, Message } from "semantic-ui-react";
import db, { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Formik } from "formik";

const AddHostaModal = ({
  triggerComponent,
  sizes,
  sunDemands,
  locations,
  buyPlaces,
  colors,
  setAdding,
  setError,
}) => {
  const [open, setOpen] = useState(false);

  const [images, setImages] = useState([]);

  useEffect(() => {
    setAdding(true);
  });
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
                buyDate: new Date(),
                registrationNumber: "",
                lastChange: "",
                buyPlace: "",
              }}
              validate={(values) => {
                const errors = {};

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
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
                    buyDate: values.buyDate,
                    registrationNumber: values.registrationNumber,
                    lastChange: new Date(),
                    buyPlace: values.buyPlace,
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
                const handleChange = (e, { name, value }) => {
                  setFieldValue(name, value);
                };

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
                        label="Nárok na slunce"
                        name="sunDemand"
                        placeholder="Vyberte nárok na slunce..."
                        options={sunDemands}
                        onChange={handleChange}
                        value={values.sunDemand}
                      />
                      <Form.Field
                        control={Select}
                        label="Pořizovací místo"
                        name="buyPlace"
                        placeholder="Vyberte pořizovací místo..."
                        options={buyPlaces}
                        onChange={handleChange}
                        value={values.buyPlace}
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
                        value={values.location}
                      />
                      <Form.Field
                        control={Select}
                        label="Velikost (cm)"
                        name="size"
                        placeholder="Vyberte velikost..."
                        options={sizes}
                        onChange={handleChange}
                        value={values.size}
                      />
                      <Form.Field
                        control={Select}
                        label="Barva"
                        name="color"
                        placeholder="Vyberte barvu..."
                        options={colors}
                        onChange={handleChange}
                        value={values.color}
                      />
                    </Form.Group>

                    <Form.Group>
                      <DatePicker
                        id="buyDate"
                        name="buyDate"
                        placeholder="Zadejte datum pořízení"
                        value={values.buyDate}
                        selected={values.buyDate}
                        onChange={(val) => {
                          setFieldValue("buyDate", val);
                        }}
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
                      Přidat
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
