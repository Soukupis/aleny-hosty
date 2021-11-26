import React from "react";
import { Card, Image } from "semantic-ui-react";

const ModalCard = ({ title, icon, subtitile }) => {
  return (
    <Card>
      <Card.Content>
        <Image floated="right" size="mini" src={icon} />
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{subtitile}</Card.Meta>
      </Card.Content>
    </Card>
  );
};
export default ModalCard;
