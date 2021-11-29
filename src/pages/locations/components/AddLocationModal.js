import React, { useState } from "react";
import { Modal, Button, Input, Form } from "semantic-ui-react";

const AddSizeModal = ({ triggerComponent }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {};

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerComponent}
      centered
      size="small"
    >
      <Modal.Header>Přidání polohy</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Field control={Input} label="Poloha" />
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setOpen(false)}>
          Zrušit
        </Button>
        <Button onClick={() => handleSubmit} positive>
          Vytvořit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default AddSizeModal;
