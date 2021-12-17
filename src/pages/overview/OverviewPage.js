import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button, Modal } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading } from "../../utils/messageUtils";
import { AddHostaModal, ListItemCard } from "./index";

import {
  getFirestoreCollectionData,
  getDropdownItemArray,
} from "../../utils/firebaseUtils";

const OverviewPage = () => {
  const [hosty, setHosty] = useState([]);
  const [sizes, setSizes] = useState();
  const [waterDemands, setWaterDemands] = useState();
  const [sunDemands, setSunDemands] = useState();
  const [locations, setLocations] = useState();
  const [colors, setColors] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState(null);

  async function fetchCollectionData(filter) {
    let hostasResult = await getFirestoreCollectionData("hostas");
    if (filter) {
      console.log(filter);
      let hostaResult1 = hostasResult.filter(
        (item) => item.name === filter.name
      );
      hostasResult = hostaResult1;
    }
    if (!hostasResult) setError(true);
    let sizesDrop;
    if (!sizes) {
      sizesDrop = await getDropdownItemArray("size", "sizes");
      setSizes(sizesDrop);
    } else {
      sizesDrop = sizes;
    }
    let waterDemandsDrop;
    if (!waterDemands) {
      waterDemandsDrop = await getDropdownItemArray("demand", "waterDemands");
      setWaterDemands(waterDemandsDrop);
    } else {
      waterDemandsDrop = waterDemands;
    }
    let sunDemandsDrop;
    if (!sunDemands) {
      sunDemandsDrop = await getDropdownItemArray("demand", "sunDemands");
      setSunDemands(sunDemandsDrop);
    } else {
      sunDemandsDrop = sunDemands;
    }
    let locationsDrop;
    if (!locations) {
      locationsDrop = await getDropdownItemArray("location", "locations");
      setLocations(locationsDrop);
    } else {
      locationsDrop = locations;
    }
    let colorsDrop;
    if (!colors) {
      colorsDrop = await getDropdownItemArray("color", "colors");
      setColors(colorsDrop);
    } else {
      colorsDrop = colors;
    }

    setHosty(
      hostasResult.map((item, index) => {
        return (
          <ListItemCard
            locations={locationsDrop}
            sizes={sizesDrop}
            sunDemands={sunDemandsDrop}
            waterDemands={waterDemandsDrop}
            colors={colorsDrop}
            item={item}
            key={index}
            collection="hostas"
            setRemoving={setRemoving}
            setEditing={setEditing}
            setError={setError}
            setLoading={setLoading}
          />
        );
      })
    );
  }

  useEffect(() => {
    setLoading(true);

    const unsubscribe = fetchCollectionData(filter)
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .then(() => {
        setLoading(false);
      });
    console.log(filter);
    return unsubscribe;
  }, [adding, editing, removing, filter]);

  return (
    <>
      {handleLoading(loading)}
      {error ? (
        <Modal size="tiny" open={!!error} onClose={() => setError(false)}>
          <Modal.Header>Chyba</Modal.Header>
          <Modal.Content>
            <p>{error}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setError(false)}>
              Zavřít
            </Button>
          </Modal.Actions>
        </Modal>
      ) : (
        ""
      )}
      <Sidebar setFilter={setFilter}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as="h1">Hosty</Header>
            </Grid.Column>
            <Grid.Column style={{ textAlign: "right" }}>
              <AddHostaModal
                sizes={sizes}
                waterDemands={waterDemands}
                sunDemands={sunDemands}
                locations={locations}
                colors={colors}
                triggerComponent={
                  <Button color="green" icon="plus" loading={loading} />
                }
                setAdding={setAdding}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <List divided size="huge" verticalAlign="middle">
          {hosty}
        </List>
      </Sidebar>
    </>
  );
};

export default OverviewPage;
