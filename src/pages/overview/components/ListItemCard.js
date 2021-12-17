import React, { useEffect, useState } from "react";
import { Item, Image, Button, Modal } from "semantic-ui-react";

import { DeleteModal } from "../../../components/index";
import HostaDetailModel from "./HostaDetailModal";
import { Placeholder } from "../../../assets/index";

import { getImages } from "../../../utils/firebaseUtils";

const ListItemCard = ({
  setError,
  item,
  collection,
  setRemoving,
  locations,
  sizes,
  colors,
  sunDemands,
  waterDemands,
  setEditing,
  setLoading,
}) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = getImages(item?.hostaId)
      .catch((error) => {
        setError(error);
      })
      .then((res) => {
        setImages(res);
        setLoading(false);
      });
    return unsubscribe;
  }, [item, setError, setLoading]);
  return (
    <Item>
      <Item.Content className="right floated" style={{ marginTop: "10px" }}>
        <HostaDetailModel
          triggerComponent={
            <Button size="mini" circular icon="folder outline" color="blue" />
          }
          item={item}
          images={images}
          locations={locations}
          sizes={sizes}
          colors={colors}
          sunDemands={sunDemands}
          waterDemands={waterDemands}
          setEditing={setEditing}
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
      <Modal
        basic
        closeIcon
        trigger={
          <Image
            size="mini"
            alt="avatar"
            src={images[0] ? images[0] : Placeholder}
            style={{ width: "40px", height: "40px" }}
          />
        }
      >
        <Modal.Content>
          <Image
            src={images[0] ? images[0] : Placeholder}
            style={{
              width: "90vh",
              maxHeight: "90vh",
              margin: "auto",
            }}
          />
        </Modal.Content>
      </Modal>
      <Item.Content>
        <Item.Header>{item?.name}</Item.Header>
        <span style={{ fontSize: "12px" }}>{item?.latinName}</span>
      </Item.Content>
    </Item>
  );
};
export default ListItemCard;
