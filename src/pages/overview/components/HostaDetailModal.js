import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Modal, Grid, Form, Message, Select } from "semantic-ui-react";
import {
  LocationImage,
  WaterImage,
  SunImage,
  SizeImage,
  ClockImage,
  ColorImage,
} from "../../../assets/index";
import ImageModal from "./ImageModal";
import ModalCard from "./ModalCard";
import { CardGroup } from "../styles/OverviewPageStyle";
import { editDocument } from "../../../utils/firebaseUtils";

const HostaDetailModal = ({
  triggerComponent,
  item,
  images,
  locations,
  sizes,
  sunDemands,
  waterDemands,
  colors,
  setEditing,
}) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerComponent}
    >
      <Modal.Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              {item?.name} ({item?.latinName})
            </Grid.Column>
            <Grid.Column textAlign="right">
              {item?.registrationNumber}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Header>

      <Modal.Content image>
        <ImageModal image={images[0]} imageArray={images} />
        <CardGroup
          style={{
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "5px",
          }}
        >
          {input ? (
            <>
              <Formik
                initialValues={{
                  name: item?.name,
                  latinName: item?.latinName,
                  registrationNumber: item?.registrationNumber,
                  location: item?.location,
                  size: item?.size,
                  color: item?.color,
                  sunDemand: item?.sunDemand,
                  waterDemand: item?.waterDemand,
                  buyDate: item?.buyDate,
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
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setEditing(true);
                  editDocument("hostas", item.id, {
                    hostaId: item.hostaId,
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
                    .catch((error) => {
                      //setError(error);
                    })
                    .then((response) => {
                      setInput(false);
                      setEditing(false);
                    });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                }) => {
                  const handleChange = (e, { name, value }) =>
                    setFieldValue(name, value);
                  return (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group widths="equal">
                        <Form.Input
                          size="small"
                          name="name"
                          label="Název"
                          onChange={handleChange}
                          value={values.name}
                        />
                        {errors.name && touched.name && errors.name ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>{errors.name}</Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}
                        <Form.Input
                          size="small"
                          name="latinName"
                          label="Latinský název"
                          onChange={handleChange}
                          value={values.latinName}
                        />
                        {errors.latinName &&
                        touched.latinName &&
                        errors.latinName ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>{errors.latinName}</Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Input
                          size="small"
                          name="registrationNumber"
                          label="Evidenční číslo"
                          onChange={handleChange}
                          value={values.registrationNumber}
                        />

                        {errors.registrationNumber &&
                        touched.registrationNumber &&
                        errors.registrationNumber ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>
                              {errors.registrationNumber}
                            </Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}

                        <Form.Field
                          control={Select}
                          size="small"
                          name="location"
                          label="Poloha"
                          options={locations}
                          onChange={handleChange}
                          value={values.location}
                        />
                        {errors.location &&
                        touched.location &&
                        errors.location ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>{errors.location}</Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Field
                          control={Select}
                          size="small"
                          name="size"
                          label="Velikost"
                          options={sizes}
                          onChange={handleChange}
                          value={values.size}
                        />

                        {errors.size && touched.size && errors.size ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>{errors.size}</Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}
                        <Form.Field
                          control={Select}
                          size="small"
                          name="color"
                          label="Barva"
                          options={colors}
                          onChange={handleChange}
                          value={values.color}
                        />

                        {errors.color && touched.color && errors.color ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>{errors.color}</Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Input
                          control={Select}
                          size="small"
                          name="sunDemand"
                          options={sunDemands}
                          label="Nároky na slunce"
                          onChange={handleChange}
                          value={values.sunDemand}
                        />

                        {errors.sunDemand &&
                        touched.sunDemand &&
                        errors.sunDemand ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>{errors.sunDemand}</Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}

                        <Form.Input
                          control={Select}
                          size="small"
                          name="waterDemand"
                          label="Nároky na vláhu"
                          options={waterDemands}
                          onChange={handleChange}
                          value={values.waterDemand}
                        />

                        {errors.waterDemand &&
                        touched.waterDemand &&
                        errors.waterDemand ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>
                              {errors.waterDemand}
                            </Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Input
                          size="small"
                          name="buyDate"
                          label="Datum pořízení"
                          onChange={handleChange}
                          value={values.buyDate.toDate().toDateString()}
                        />

                        {errors.buyDate && touched.buyDate && errors.buyDate ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>{errors.buyDate}</Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}
                      </Form.Group>

                      <Button type="submit" disabled={isSubmitting} positive>
                        Submit
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </>
          ) : (
            <>
              <ModalCard
                icon={LocationImage}
                title={item?.location}
                subtitile="Poloha"
              />
              <ModalCard
                icon={SizeImage}
                title={item?.size}
                subtitile="Velikost"
              />
              <ModalCard
                icon={SunImage}
                title={item?.sunDemand}
                subtitile="Nároky na slunce"
              />
              <ModalCard
                icon={WaterImage}
                title={item?.waterDemand}
                subtitile="Nároky na vláhu"
              />
              <ModalCard
                icon={ColorImage}
                title={item?.color}
                subtitile="Barva"
              />
              <ModalCard
                icon={ClockImage}
                title={item?.buyDate?.toDate().toDateString()}
                subtitile="Datum pořízení"
              />
            </>
          )}
        </CardGroup>
      </Modal.Content>
      <Modal.Actions>
        {!input ? (
          <Button onClick={() => setInput(true)} primary>
            Upravit
          </Button>
        ) : (
          <></>
        )}

        <Button onClick={() => setOpen(false)}>Zavřít</Button>
      </Modal.Actions>
    </Modal>
  );
};
export default HostaDetailModal;
