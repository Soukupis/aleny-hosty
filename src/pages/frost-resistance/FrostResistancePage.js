import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading, handleError } from "../../utils/messageUtils";
import { AddFrostResistanceModal, ListItemCard } from "./index";

import { getFirestoreCollectionData } from "../../utils/firebaseUtils";

const FrostResistancePage = () => {
  const [frostResistanceItems, setFrostResistanceItems] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let frostResistanceItemList = [];

    async function fetchFrostResistanceData() {
      let frostResistanceResult = await getFirestoreCollectionData(
        "frostResistanceItems"
      );
      if (!frostResistanceResult) setError(true);
      frostResistanceItemList = frostResistanceResult.map((item, index) => {
        return <ListItemCard item={item} key={index} />;
      });
      setFrostResistanceItems(frostResistanceItemList);
    }

    fetchFrostResistanceData()
      .then()
      .catch(() => {
        setError(true);
      })
      .then(() => setLoading(false));
  }, []);
  return (
    <>
      {handleError(error)}
      {handleLoading(loading)}
      <Sidebar>
        <Grid>
          <Grid.Row>
            <Grid.Column width="eight" floated="left">
              <Header as="h1">Mrazuvzdornost</Header>
            </Grid.Column>
            <Grid.Column>
              <AddFrostResistanceModal
                triggerComponent={
                  <Button color="green" icon="plus" loading={loading} />
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <List divided size="huge" verticalAlign="middle">
          {frostResistanceItems}
        </List>
      </Sidebar>
    </>
  );
};

export default FrostResistancePage;
