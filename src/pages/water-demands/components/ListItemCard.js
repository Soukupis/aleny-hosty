import React, { useState } from "react";
import { Item, Image, Button, Form, Input, Message } from "semantic-ui-react";

import { DeleteModal } from "../../../components/index";
import { WaterImage } from "../../../assets/index";
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
          text={`Vážně chcete odstranit nárok na vodu ${item?.demand} ?`}
          title="Mazání nároku na vodu"
          collection={collection}
          item={item}
          setRemoving={setRemoving}
        />
      </Item.Content>
      <Image size="mini" src={WaterImage} alt="avatar" />
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
                  editDocument("waterDemands", item.id, {
                    demand: values.demand,
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
                        size="mini"
                        name="demand"
                        control={Input}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.demand}
                      />
                      {errors.demand && touched.demand && errors.demand ? (
                        <Message
                          negative
                          style={{ marginTop: "0px" }}
                          size="mini"
                        >
                          <Message.Header>{errors.demand}</Message.Header>
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
