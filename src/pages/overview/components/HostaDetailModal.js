import React, { useState } from "react";
import { Button, Modal, Grid, Image, Segment } from "semantic-ui-react";
import {
  LocationImage,
  WaterImage,
  SunImage,
  SizeImage,
  ClockImage,
  ColorImage,
} from "../../../assets/index";
import ImageModal from "./ImageModal";
import ModalCard from "./ModalCard";
import { CardGroup } from "../styles/OverviewPageStyle";

const HostaDetailModal = ({ triggerComponent, item, images }) => {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerComponent}
    >
      <Modal.Header>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              {item?.name} ({item?.latinName})
            </Grid.Column>
            <Grid.Column textAlign="right">
              {item?.registrationNumber}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Header>

      <Modal.Content image>
        <ImageModal image={images[0]} imageArray={images} />
        <CardGroup style={{ justifyContent: "center" }}>
          <ModalCard
            icon={LocationImage}
            title={item?.location}
            subtitile="Umístění"
          />
          <ModalCard icon={SizeImage} title={item?.size} subtitile="Velikost" />
          <ModalCard
            icon={SunImage}
            title={item?.sunDemand}
            subtitile="Nároky na slunce"
          />
          <ModalCard
            icon={WaterImage}
            title={item?.waterDemand}
            subtitile="Nároky na vodu"
          />
          <ModalCard icon={ColorImage} title={item?.color} subtitile="Barva" />
          <ModalCard
            icon={ClockImage}
            title={item?.buyDate?.toDate().toDateString()}
            subtitile="Datum pořízení"
          />
        </CardGroup>
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
