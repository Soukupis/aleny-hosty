import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button, Modal } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading, handleError } from "../../utils/messageUtils";
import { AddHostaModal, ListItemCard } from "./index";

import {
  getFirestoreCollectionData,
  getDropdownItemArray,
} from "../../utils/firebaseUtils";

const OverviewPage = () => {
  const [hosty, setHosty] = useState();
  const [sizes, setSizes] = useState([]);
  const [waterDemands, setWaterDemands] = useState([]);
  const [sunDemands, setSunDemands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    setLoading(true);
    let hostaList = [];

    async function fetchCollectionData() {
      let hostasResult = await getFirestoreCollectionData("hostas");
      if (!hostasResult) setError(true);
      hostaList = hostasResult.map((item, index) => {
        return (
          <ListItemCard
            item={item}
            key={index}
            collection="hostas"
            setRemoving={setRemoving}
            setEditing={setEditing}
            setError={setError}
          />
        );
      });
      let sizesResult = await getFirestoreCollectionData("sizes");
      if (!sizesResult) setError(true);
      let waterDemandsResult = await getFirestoreCollectionData("waterDemands");
      if (!waterDemandsResult) setError(true);
      let sunDemandsResult = await getFirestoreCollectionData("sunDemands");
      if (!sunDemandsResult) setError(true);
      let locationsResult = await getFirestoreCollectionData("locations");
      if (!locationsResult) setError(true);
      let colorsResult = await getFirestoreCollectionData("colors");
      if (!colorsResult) setError(true);
      setSizes(getDropdownItemArray("size", sizesResult));
      setWaterDemands(getDropdownItemArray("demand", waterDemandsResult));
      setSunDemands(getDropdownItemArray("demand", sunDemandsResult));
      setLocations(getDropdownItemArray("location", locationsResult));
      setColors(getDropdownItemArray("color", colorsResult));
      setHosty(hostaList);
    }

    fetchCollectionData()
      .catch((error) => {
        setError(error);
      })
      .then(() => setLoading(false));
  }, [adding, editing, removing]);

  return (
    <>
      {handleLoading(loading)}
      {error ? (
        <Modal size="tiny" open={error} onClose={() => setError(false)}>
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
      <Sidebar>
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
