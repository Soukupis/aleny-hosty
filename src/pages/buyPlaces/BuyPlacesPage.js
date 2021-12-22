import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button, Modal } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading } from "../../utils/messageUtils";

import { getFirestoreCollectionData } from "../../utils/firebaseUtils";
import AddBuyPlaceModal from "./components/AddBuyPlaceModal";

import { ListItemCard } from "./index";

const BuyPlacesPage = () => {
  const [buyPlaces, setBuyPlaces] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);

  async function fetchLocationData() {
    let buyPlacesList = [];
    let buyPlacesResult = await getFirestoreCollectionData("buyPlaces");
    if (!buyPlacesResult) setError("Načtení dat se nezdařilo");
    buyPlacesList = buyPlacesResult.map((item, index) => {
      return (
        <ListItemCard
          item={item}
          key={index}
          collection="buyPlaces"
          setRemoving={setRemoving}
          setEditing={setEditing}
          setError={setError}
        />
      );
    });
    setBuyPlaces(buyPlacesList);
  }

  useEffect(() => {
    setLoading(true);

    const unsubscribe = fetchLocationData()
      .catch((error) => {
        setError(error);
      })
      .then(() => {
        setLoading(false);
      });
    return unsubscribe;
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
              <Header as="h1">Pořizovací místa</Header>
            </Grid.Column>
            <Grid.Column>
              <AddBuyPlaceModal
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
          {buyPlaces}
        </List>
      </Sidebar>
    </>
  );
};

export default BuyPlacesPage;
