import React, { useState } from "react";
import { Button, Item, Image, Form, Input, Message } from "semantic-ui-react";
import { DeleteModal } from "../../../components/index";
import { SizeImage } from "../../../assets";
import { Formik } from "formik";
import { editDocument } from "../../../utils/firebaseUtils";

const ListItemCard = ({ item, setRemoving, collection, setEditing }) => {
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
          text={`Vážně chcete odstranit velikost ${item?.size}cm`}
          title="Mazání velikosti"
          collection={collection}
          item={item}
          setRemoving={setRemoving}
        />
      </Item.Content>
      <Image size="mini" src={SizeImage} alt="avatar" />
      <Item.Content>
        <Item.Header>
          {!input ? (
            `${item?.size} cm`
          ) : (
            <>
              <Formik
                initialValues={{ size: item?.size }}
                validate={(values) => {
                  const errors = {};
                  if (!values.size) {
                    errors.size = "Pole nesmí být prázdné";
                  }
                  if (!/^[0-9]*$/.test(values.size)) {
                    errors.size = "Pole musí obsahovat pouze číslice";
                  }
                  console.log(errors);
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  editDocument("sizes", item.id, {
                    size: values.size,
                    lastChange: new Date(),
                  })
                    .catch((error) => {
                      console.log(error);
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
                        name="size"
                        control={Input}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.size}
                        focus
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
