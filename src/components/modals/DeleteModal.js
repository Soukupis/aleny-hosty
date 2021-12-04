import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { deleteDocument } from "../../utils/firebaseUtils";

const DeleteModal = ({
  triggerComponent,
  text,
  title,
  collection,
  item,
  setRemoving,
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const successful = await deleteDocument(collection, item.id);
    if (successful) {
      setOpen(false);
    } else {
      console.log("error");
    }
    setRemoving(false);
    console.log("success");
  };

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
        <Button negative onClick={() => handleDelete()}>
          Smazat
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default DeleteModal;
