import React, {useEffect, useState} from "react";
import {getFirestoreCollectionData} from "../../utils/firebaseUtils";
import AddColorModal from "./components/AddColorModal";
import ListItemCard from "./components/ListItemCard";
import {handleLoading} from "../../utils/messageUtils";
import {Button, Divider, Grid, Header, List, Modal} from "semantic-ui-react";
import {Sidebar} from "../../components";

const ColorsPage = () => {
  const [colors, setColors] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);

  async function fetchSizesData() {
    let colorsList = [];
    let colorsResult = await getFirestoreCollectionData("colors");
    if (!colorsResult) setError("Načtení dat se nezdařilo");
    colorsResult = colorsResult.sort();
    colorsList = colorsResult.map((item, index) => {
      return (
          <ListItemCard
              item={item}
              key={index}
              collection="colors"
              setRemoving={setRemoving}
              setEditing={setEditing}
              setError={setError}
          />
      );
    });
    setColors(colorsList);
  }

  useEffect(() => {
    setLoading(true);


    const unsubscribe = fetchSizesData()
        .catch((error) => {
          setError(error);
        })
        .then(() => setLoading(false));
    return unsubscribe
  }, [adding, removing, editing]);
  return (
      <>
        {handleLoading(loading)}
        {error ? (
            <Modal size="tiny" open={error} onClose={() => setError("")}>
              <Modal.Header>Chyba</Modal.Header>
              <Modal.Content>
                <p>{error}</p>
              </Modal.Content>
              <Modal.Actions>
                <Button negative onClick={() => setError("")}>
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
                <Header as="h1">Barvy</Header>
              </Grid.Column>
              <Grid.Column style={{textAlign: "right"}}>
                <AddColorModal
                    triggerComponent={<Button color="green" icon="plus"/>}
                    setAdding={setAdding}
                    setError={setError}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider clearing/>
          <List divided size="huge" verticalAlign="middle">
            {colors}
          </List>
        </Sidebar>
      </>
  );
};
export default ColorsPage;
