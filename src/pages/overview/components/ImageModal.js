import React from "react";
import { Image, Modal } from "semantic-ui-react";
import { ImageModalContainer } from "../styles/OverviewPageStyle";

const ImageModal = ({ image }) => {
  return (
    <Modal basic closeIcon trigger={<Image size="large" src={image} wrapped />}>
      <Modal.Content>
        <ImageModalContainer src={image} />
      </Modal.Content>
    </Modal>
  );
};

export default ImageModal;
