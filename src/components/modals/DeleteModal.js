import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

const DeleteModal = ({ triggerComponent, text, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerComponent}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{text}</Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Zrušit</Button>
        <Button negative onClick={() => setOpen(false)}>
          Smazat
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default DeleteModal;
