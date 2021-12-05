import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button, Modal } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading } from "../../utils/messageUtils";
import { AddLocationModal, ListItemCard } from "./index";

import { getFirestoreCollectionData } from "../../utils/firebaseUtils";

const SunDemandsPage = () => {
  const [locations, setLocation] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    let locationsList = [];

    async function fetchLocationData() {
      let locationsResult = await getFirestoreCollectionData("locations");
      if (!locationsResult) setError("Načtení dat se nezdařilo");
      locationsList = locationsResult.map((item, index) => {
        return (
          <ListItemCard
            item={item}
            key={index}
            collection="locations"
            setRemoving={setRemoving}
            setEditing={setEditing}
            setError={setError}
          />
        );
      });
      setLocation(locationsList);
    }

    fetchLocationData()
      .catch((error) => {
        setError(error);
      })
      .then(() => {
        setLoading(false);
      });
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
              <Header as="h1">Polohy</Header>
            </Grid.Column>
            <Grid.Column>
              <AddLocationModal
                triggerComponent={
                  <Button color="green" icon="plus" loading={loading} />
                }
                setAdding={setAdding}
                setError={setError}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <List divided size="huge" verticalAlign="middle">
          {locations}
        </List>
      </Sidebar>
    </>
  );
};

export default SunDemandsPage;
