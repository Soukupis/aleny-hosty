import React, { useState } from "react";
import { Button, Image, Modal } from "semantic-ui-react";
import {
  LeafImage,
  LocationImage,
  WaterImage,
  SunImage,
  SizeImage,
  IceCubeImage,
  ClockImage,
} from "../../../assets/index";
import ImageModal from "./ImageModal";
import ModalCard from "./ModalCard";
import { CardGroup } from "../styles/OverviewPageStyle";

const HostaDetailModal = ({ triggerComponent, item }) => {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerComponent}
    >
      <Modal.Header>
        {item?.name}
        {item?.frostResistance ? (
          <Image floated="right" size="mini" src={IceCubeImage} />
        ) : (
          ""
        )}
      </Modal.Header>
      <Modal.Content image>
        <ImageModal image={item?.image ? item?.image : LeafImage} />
        <Modal.Description>
          <CardGroup>
            <ModalCard
              icon={LocationImage}
              title={item?.location}
              subtitile="Umístění"
            />
            <ModalCard
              icon={SizeImage}
              title={item?.size}
              subtitile="Velikost"
            />
            <ModalCard
              icon={WaterImage}
              title={item?.color}
              subtitile="Barva"
            />
            <ModalCard
              icon={SunImage}
              title={item?.sunDemands}
              subtitile="Nároky na slunce"
            />
            <ModalCard
              icon={WaterImage}
              title={item?.waterDemands}
              subtitile="Nároky na vodu"
            />
            <ModalCard
              icon={ClockImage}
              title={item?.buyDate?.toDate().toDateString()}
              subtitile="Datum pořízení"
            />
          </CardGroup>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Upravit
        </Button>
        <Button onClick={() => setOpen(false)}>Zavřít</Button>
      </Modal.Actions>
    </Modal>
  );
};
export default HostaDetailModal;
