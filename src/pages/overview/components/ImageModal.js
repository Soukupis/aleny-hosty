import React from "react";
import { Image, Modal } from "semantic-ui-react";
import { ImageModalContainer } from "../styles/OverviewPageStyle";

const ImageModal = ({ image, imageArray }) => {
  return (
    <Modal
      basic
      closeIcon
      trigger={<Image size="medium" src={image} wrapped />}
    >
      <Modal.Content>
        {imageArray.map((image, index) => {
          return <ImageModalContainer src={image} key={index} />;
        })}
      </Modal.Content>
    </Modal>
  );
};

export default ImageModal;
