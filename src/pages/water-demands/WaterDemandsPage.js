import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading, handleError } from "../../utils/messageUtils";
import { AddWaterDemandModal, ListItemCard } from "./index";
import { SearchInput } from "../../components/index.js";

import { getFirestoreCollectionData } from "../../utils/firebaseUtils";

const WaterDemandsPage = () => {
  const [waterDemands, setWaterDemands] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let waterDemandsList = [];

    async function fetchWaterDemandsData() {
      let waterDemandsResult = await getFirestoreCollectionData("waterDemands");
      if (!waterDemandsResult) setError(true);
      waterDemandsList = waterDemandsResult.map((item, index) => {
        return <ListItemCard item={item} key={index} />;
      });
      setWaterDemands(waterDemandsList);
    }

    fetchWaterDemandsData()
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
              <Header as="h1">Nároky na vláhu</Header>
            </Grid.Column>

            <div className="right floated">
              <SearchInput />
            </div>
            <AddWaterDemandModal
              triggerComponent={
                <Button color="green" icon="plus" loading={loading} />
              }
            />
          </Grid.Row>
        </Grid>
        <List divided size="huge" verticalAlign="middle">
          {waterDemands}
        </List>
      </Sidebar>
    </>
  );
};

export default WaterDemandsPage;
