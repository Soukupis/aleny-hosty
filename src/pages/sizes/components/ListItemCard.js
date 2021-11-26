import React from "react";
import { List, Image, Button } from "semantic-ui-react";
import { DeleteModal } from "../../../components/index";

const ListItemCard = ({ item }) => {
  return (
    <>
      <List.Item style={{ marginRight: "15px" }}>
        <List.Content verticalAlign="middle">
          <DeleteModal
            triggerComponent={
              <Button size="mini" circular icon="trash" negative />
            }
            text={`Vážně chcete odstranit velisko ${item?.size}cm`}
            title="Mazání velikosti"
          />
          <span style={{ verticalAlign: "middle" }}>{item.size} cm</span>
        </List.Content>
      </List.Item>
    </>
  );
};
export default ListItemCard;

/*
* <Item>
      <Item.Content className="right floated" style={{ marginTop: "10px" }}>
        <DeleteModal
          triggerComponent={
            <Button size="mini" circular icon="trash" negative />
          }
          itemName={item?.name}
        />
      </Item.Content>
      <Image size="mini" src={LeafImage} alt="avatar" />
      <Item.Content>
        <Item.Header>{item?.name}</Item.Header>
        <span style={{ fontSize: "12px" }}>
          Poslední změna: {item?.lastChange?.toDate().toDateString()}
        </span>
      </Item.Content>
    </Item>
* */
