import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button, Divider, Modal } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading } from "../../utils/messageUtils";
import { AddWaterDemandModal, ListItemCard } from "./index";

import { getFirestoreCollectionData } from "../../utils/firebaseUtils";

const WaterDemandsPage = () => {
  const [waterDemands, setWaterDemands] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    let waterDemandsList = [];

    async function fetchWaterDemandsData() {
      let waterDemandsResult = await getFirestoreCollectionData("waterDemands");
      if (!waterDemandsResult) setError(true);
      waterDemandsList = waterDemandsResult.map((item, index) => {
        return (
          <ListItemCard
            item={item}
            key={index}
            collection="waterDemands"
            setRemoving={setRemoving}
            setEditing={setEditing}
            setError={setError}
          />
        );
      });
      setWaterDemands(waterDemandsList);
    }

    fetchWaterDemandsData()
      .catch((error) => {
        setError(error);
      })
      .then(() => setLoading(false));
  }, [adding, removing, editing]);
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
          <Grid.Row>
            <Grid.Column width="eight" floated="left">
              <Header as="h1">Nároky na vláhu</Header>
            </Grid.Column>
            <Grid.Column>
              <AddWaterDemandModal
                triggerComponent={
                  <Button color="green" icon="plus" loading={loading} />
                }
                setAdding={setAdding}
                setError={setError}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider clearing />
        <List divided size="huge" verticalAlign="middle">
          {waterDemands}
        </List>
      </Sidebar>
    </>
  );
};

export default WaterDemandsPage;
