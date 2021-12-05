import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button, Divider } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading, handleError } from "../../utils/messageUtils";
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
      if (!sunDemandsResult) setError(true);
      sunDemandsList = sunDemandsResult.map((item, index) => {
        return (
          <ListItemCard
            item={item}
            key={index}
            collection="sunDemands"
            setRemoving={setRemoving}
            setEditing={setEditing}
          />
        );
      });
      setSunDemands(sunDemandsList);
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
          <Grid.Row columns={2}>
            <Grid.Column width="eight" floated="left">
              <Header as="h1">Nároky na slunce</Header>
            </Grid.Column>
            <Grid.Column style={{ textAlign: "right" }}>
              <AddSunDemandModal
                triggerComponent={<Button color="green" icon="plus" />}
                setAdding={setAdding}
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
