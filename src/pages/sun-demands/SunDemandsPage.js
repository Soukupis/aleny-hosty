import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading, handleError } from "../../utils/messageUtils";
import { AddSunDemandModal, ListItemCard } from "./index";
import { SearchInput } from "../../components/index.js";

import { getFirestoreCollectionData } from "../../utils/firebaseUtils";

const SunDemandsPage = () => {
  const [sunDemands, setSunDemands] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let sunDemandsList = [];

    async function fetchSunDemandsData() {
      let sunDemandsResult = await getFirestoreCollectionData("sunDemands");
      if (!sunDemandsResult) setError(true);
      sunDemandsList = sunDemandsResult.map((item, index) => {
        return <ListItemCard item={item} key={index} />;
      });
      setSunDemands(sunDemandsList);
    }

    fetchSunDemandsData()
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
              <Header as="h1">Nároky na slunce</Header>
            </Grid.Column>

            <div className="right floated">
              <SearchInput />
            </div>
            <AddSunDemandModal
              triggerComponent={
                <Button color="green" icon="plus" loading={loading} />
              }
            />
          </Grid.Row>
        </Grid>
        <List divided size="huge" verticalAlign="middle">
          {sunDemands}
        </List>
      </Sidebar>
    </>
  );
};

export default SunDemandsPage;
