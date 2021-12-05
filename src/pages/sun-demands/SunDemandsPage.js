import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button, Divider, Modal } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading } from "../../utils/messageUtils";
import { AddSunDemandModal, ListItemCard } from "./index";

import { getFirestoreCollectionData } from "../../utils/firebaseUtils";

const SunDemandsPage = () => {
  const [sunDemands, setSunDemands] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    let sunDemandsList = [];

    async function fetchSunDemandsData() {
      let sunDemandsResult = await getFirestoreCollectionData("sunDemands");
      if (!sunDemandsResult) setError("Načtení dat se nezdařilo");
      sunDemandsList = sunDemandsResult.map((item, index) => {
        return (
          <ListItemCard
            item={item}
            key={index}
            collection="sunDemands"
            setRemoving={setRemoving}
            setEditing={setEditing}
            setError={setError}
          />
        );
      });
      setSunDemands(sunDemandsList);
    }

    fetchSunDemandsData()
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
          <Grid.Row columns={2}>
            <Grid.Column width="eight" floated="left">
              <Header as="h1">Nároky na slunce</Header>
            </Grid.Column>
            <Grid.Column style={{ textAlign: "right" }}>
              <AddSunDemandModal
                triggerComponent={<Button color="green" icon="plus" />}
                setAdding={setAdding}
                setError={setError}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider clearing />
        <List divided size="huge" verticalAlign="middle">
          {sunDemands}
        </List>
      </Sidebar>
    </>
  );
};

export default SunDemandsPage;
