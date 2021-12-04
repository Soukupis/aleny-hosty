import React, { useState } from "react";
import { Formik } from "formik";
import { Item, Image, Button, Input, Form } from "semantic-ui-react";

import { DeleteModal } from "../../../components/index";
import { SunImage } from "../../../assets/index";

import { editDocument } from "../../../utils/firebaseUtils";

const ListItemCard = ({ item, collection, setRemoving, setEditing }) => {
  const [input, setInput] = useState(false);
  return (
    <Item>
      <Item.Content className="right floated" style={{ marginTop: "10px" }}>
        <Button
          size="mini"
          circular
          icon="edit outline"
          color="blue"
          onClick={() => {
            setInput(!input);
            setEditing(true);
          }}
        />
        <DeleteModal
          triggerComponent={
            <Button
              size="mini"
              circular
              icon="trash"
              negative
              item={item}
              onClick={() => setRemoving(true)}
            />
          }
          text={`Vážně chcete odstranit nárok na slunce ${item?.demand} ?`}
          title="Mazání nároku na slunce"
          collection={collection}
          item={item}
          setRemoving={setRemoving}
        />
      </Item.Content>
      <Image size="mini" src={SunImage} alt="avatar" />
      <Item.Content>
        <Item.Header>
          {!input ? (
            item?.demand
          ) : (
            <>
              <Formik
                initialValues={{ demand: item?.demand }}
                validate={(values) => {
                  const errors = {};
                  if (!values.demand) {
                    errors.demand = "Pole nesmí být prázdné";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const result = editDocument("sunDemands", item.id, {
                    demand: values.demand,
                    lastChange: new Date(),
                  });
                  if (result) {
                    setInput(false);
                  } else {
                    console.log("nm");
                  }
                  setEditing(false);
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
                    <Form.Field
                      size="mini"
                      name="demand"
                      control={Input}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.demand}
                    />
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Item.Header>

        <span style={{ fontSize: "12px" }}>
          Poslední změna: {item?.lastChange?.toDate().toDateString()}
        </span>
      </Item.Content>
    </Item>
  );
};
export default ListItemCard;
