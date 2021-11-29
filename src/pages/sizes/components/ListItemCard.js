import React from "react";
import { List, Button } from "semantic-ui-react";
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
            text={`Vážně chcete odstranit velikost ${item?.size}cm`}
            title="Mazání velikosti"
          />
          <span style={{ verticalAlign: "middle" }}>{item?.size} cm</span>
        </List.Content>
      </List.Item>
    </>
  );
};
export default ListItemCard;
