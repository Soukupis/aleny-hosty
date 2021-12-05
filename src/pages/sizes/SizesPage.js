import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components";
import { handleLoading } from "../../utils/messageUtils";
import { Button, Divider, Grid, Header, List, Modal } from "semantic-ui-react";
import { AddSizeModal, ListItemCard } from "./index";
import { getFirestoreCollectionData } from "../../utils/firebaseUtils";

const SizesPage = () => {
  const [sizes, setSizes] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setLoading(true);
    let sizesList = [];

    async function fetchSizesData() {
      let sizesResult = await getFirestoreCollectionData("sizes");
      if (!sizesResult) setError("Načtení dat se nezdařilo");
      sizesResult = sizesResult.sort();
      sizesList = sizesResult.map((item, index) => {
        return (
          <ListItemCard
            item={item}
            key={index}
            collection="sizes"
            setRemoving={setRemoving}
            setEditing={setEditing}
            setError={setError}
          />
        );
      });
      setSizes(sizesList);
    }

    fetchSizesData()
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
              <Header as="h1">Velikosti</Header>
            </Grid.Column>
            <Grid.Column style={{ textAlign: "right" }}>
              <AddSizeModal
                triggerComponent={<Button color="green" icon="plus" />}
                setAdding={setAdding}
                setError={setError}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider clearing />
        <List divided size="huge" verticalAlign="middle">
          {sizes}
        </List>
      </Sidebar>
    </>
  );
};

export default SizesPage;
