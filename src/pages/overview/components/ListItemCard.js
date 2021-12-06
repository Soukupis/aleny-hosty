import React from "react";
import { Item, Image, Button } from "semantic-ui-react";

import { DeleteModal } from "../../../components/index";
import HostaDetailModel from "./HostaDetailModal";
import { LeafImage } from "../../../assets/index";

const ListItemCard = ({ item, collection, setRemoving }) => {
  return (
    <Item>
      <Item.Content className="right floated" style={{ marginTop: "10px" }}>
        <HostaDetailModel
          triggerComponent={
            <Button size="mini" circular icon="folder outline" color="blue" />
          }
          item={item}
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
          text={`Vážně chcete odstranit hostu ${item?.name}(${item?.latinName})`}
          title="Mazání hosty"
          collection={collection}
          item={item}
          setRemoving={setRemoving}
        />
      </Item.Content>
      <Image size="mini" src={LeafImage} alt="avatar" />
      <Item.Content>
        <Item.Header>{item?.name}</Item.Header>
        <span style={{ fontSize: "12px" }}>{item?.latinName}</span>
      </Item.Content>
    </Item>
  );
};
export default ListItemCard;
