import React, { useState } from "react";
import { Item, Image, Button, Form, Input, Message } from "semantic-ui-react";

import { DeleteModal } from "../../../components/index";
import { ShoppingCart } from "../../../assets/index";
import { Formik } from "formik";
import { editDocument } from "../../../utils/firebaseUtils";

const ListItemCard = ({
  item,
  collection,
  setRemoving,
  setEditing,
  setError,
}) => {
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
          text={`Vážně chcete odstranit pořizovací místo ${item?.place} ?`}
          title="Mazání pořizovacího místa"
          collection={collection}
          item={item}
          setRemoving={setRemoving}
        />
      </Item.Content>

      <Image size="mini" src={ShoppingCart} alt="avatar" />
      <Item.Content>
        <Item.Header>
          {!input ? (
            item?.place
          ) : (
            <>
              <Formik
                initialValues={{ place: item?.place }}
                validate={(values) => {
                  const errors = {};
                  if (!values.place) {
                    errors.place = "Pole nesmí být prázdné";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  editDocument("buyPlaces", item.id, {
                    place: values.place,
                    lastChange: new Date(),
                  })
                    .catch((error) => {
                      setError(error);
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
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Field
                        size="small"
                        name="place"
                        control={Input}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.place}
                        focus
                      />
                      {errors.place && touched.place && errors.place ? (
                        <Message
                          negative
                          style={{ marginTop: "0px" }}
                          size="mini"
                        >
                          <Message.Header>{errors.place}</Message.Header>
                        </Message>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Item.Header>
      </Item.Content>
    </Item>
  );
};
export default ListItemCard;
