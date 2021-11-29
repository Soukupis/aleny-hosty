import React from "react";
import { Item, Image, Button } from "semantic-ui-react";

import { DeleteModal } from "../../../components/index";
import { LocationImage } from "../../../assets/index";

const ListItemCard = ({ item }) => {
  return (
    <Item>
      <Item.Content className="right floated" style={{ marginTop: "10px" }}>
        <DeleteModal
          triggerComponent={
            <Button size="mini" circular icon="trash" negative />
          }
          text={`Vážně chcete odstranit polohu ${item?.location} ?`}
          title="Mazání polohy"
        />
      </Item.Content>
      <Image size="mini" src={LocationImage} alt="avatar" />
      <Item.Content>
        <Item.Header>{item?.location}</Item.Header>
        <span style={{ fontSize: "12px" }}>
          Poslední změna: {item?.lastChange?.toDate().toDateString()}
        </span>
      </Item.Content>
    </Item>
  );
};
export default ListItemCard;
