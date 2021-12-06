import React, { useState } from "react";
import { Button, Item, Image, Form, Input, Message } from "semantic-ui-react";
import { DeleteModal } from "../../../components/index";
import { ColorImage, SizeImage } from "../../../assets";
import { Formik } from "formik";
import { editDocument } from "../../../utils/firebaseUtils";

const ListItemCard = ({
  item,
  setRemoving,
  collection,
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
          text={`Vážně chcete odstranit barvu ${item?.color}`}
          title="Mazání barvy"
          collection={collection}
          item={item}
          setRemoving={setRemoving}
        />
      </Item.Content>
      <Image size="mini" src={ColorImage} alt="avatar" />
      <Item.Content>
        <Item.Header>
          {!input ? (
            `${item?.color}`
          ) : (
            <>
              <Formik
                initialValues={{ color: item?.color }}
                validate={(values) => {
                  const errors = {};
                  if (!values.color) {
                    errors.color = "Pole nesmí být prázdné";
                  }
                  if (/^[0-9]*$/.test(values.color)) {
                    errors.color = "Pole nesmí obsahovat číslice";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  editDocument("colors", item.id, {
                    color: values.color,
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
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Field
                        size="small"
                        name="color"
                        control={Input}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.color}
                        focus
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
