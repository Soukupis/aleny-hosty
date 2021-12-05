import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading, handleError } from "../../utils/messageUtils";
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

    async function fetchSunDemandsData() {
      let locationsResult = await getFirestoreCollectionData("locations");
      if (!locationsResult) setError(true);
      locationsList = locationsResult.map((item, index) => {
        return (
          <ListItemCard
            item={item}
            key={index}
            collection="locations"
            setRemoving={setRemoving}
            setEditing={setEditing}
          />
        );
      });
      setLocation(locationsList);
    }

    fetchSunDemandsData()
      .then()
      .catch(() => {
        setError(true);
      })
      .then(() => setLoading(false));
  }, [adding, removing, editing]);
  return (
    <>
      {handleError(error)}
      {handleLoading(loading)}
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
