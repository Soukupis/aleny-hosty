import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Modal, Grid, Form, Message, Select } from "semantic-ui-react";
import {
  LocationImage,
  SunImage,
  SizeImage,
  ClockImage,
  ColorImage,
  ShoppingCart,
} from "../../../assets/index";
import ImageModal from "./ImageModal";
import ModalCard from "./ModalCard";
import { CardGroup } from "../styles/OverviewPageStyle";
import { editDocument } from "../../../utils/firebaseUtils";
import { useAuth } from "../../../contexts/AuthContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HostaDetailModal = ({
  triggerComponent,
  item,
  images,
  locations,
  sizes,
  sunDemands,
  buyPlaces,
  colors,
  setEditing,
}) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);

  const { isAdmin } = useAuth();
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
          {input && isAdmin ? (
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
                  buyDate: item?.buyDate.toDate(),
                  buyPlace: item?.buyPlace,
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.size) {
                    errors.size = "Pole nesm?? b??t pr??zdn??";
                  }
                  if (!values.name) {
                    errors.name = "Pole nesm?? b??t pr??zdn??";
                  }
                  if (!values.latinName) {
                    errors.latinName = "Pole nesm?? b??t pr??zdn??";
                  }
                  if (!values.location) {
                    errors.location = "Pole nesm?? b??t pr??zdn??";
                  }
                  if (!values.color) {
                    errors.color = "Pole nesm?? b??t pr??zdn??";
                  }
                  if (!values.sunDemand) {
                    errors.sunDemand = "Pole nesm?? b??t pr??zdn??";
                  }
                  if (!values.buyDate) {
                    errors.buyDate = "Pole nesm?? b??t pr??zdn??";
                  }
                  if (!values.buyPlace) {
                    errors.buyPlace = "Pole nesm?? b??t pr??zdn??";
                  }
                  if (!values.registrationNumber) {
                    errors.registrationNumber = "Pole nesm?? b??t pr??zdn??";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  editDocument("hostas", item.id, {
                    hostaId: item.hostaId,
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
                          label="N??zev"
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
                          label="Latinsk?? n??zev"
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
                          label="Eviden??n?? ????slo"
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
                          label="N??roky na slunce"
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
                      </Form.Group>
                      <Form.Group widths="equal">
                        <Form.Input
                          control={Select}
                          size="small"
                          name="buyPlace"
                          options={buyPlaces}
                          label="Po??izovac?? m??sto"
                          onChange={handleChange}
                          value={values.buyPlace}
                        />

                        {errors.buyPlace &&
                        touched.buyPlace &&
                        errors.buyPlace ? (
                          <Message
                            negative
                            style={{ marginTop: "0px" }}
                            size="mini"
                          >
                            <Message.Header>{errors.buyPlace}</Message.Header>
                          </Message>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Form.Group widths="equal">
                        <DatePicker
                          id="buyDate"
                          name="buyDate"
                          placeholder="Zadejte datum po????zen??"
                          value={values.buyDate}
                          selected={values.buyDate}
                          onChange={(val) => {
                            setFieldValue("buyDate", val);
                          }}
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
                        Potvrdit
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
                subtitile="N??roky na slunce"
              />
              <ModalCard
                icon={ShoppingCart}
                title={item?.buyPlace}
                subtitile="M??sto po????zen??"
              />
              <ModalCard
                icon={ColorImage}
                title={item?.color}
                subtitile="Barva"
              />
              <ModalCard
                icon={ClockImage}
                title={item?.buyDate?.toDate().toDateString()}
                subtitile="Datum po????zen??"
              />
            </>
          )}
        </CardGroup>
      </Modal.Content>
      <Modal.Actions>
        {!input && isAdmin ? (
          <Button
            onClick={() => {
              setEditing(true);
              setInput(true);
            }}
            primary
          >
            Upravit
          </Button>
        ) : (
          <></>
        )}

        <Button onClick={() => setOpen(false)}>Zav????t</Button>
      </Modal.Actions>
    </Modal>
  );
};
export default HostaDetailModal;
