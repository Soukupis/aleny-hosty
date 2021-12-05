import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading, handleError } from "../../utils/messageUtils";
import { AddHostaModal, ListItemCard } from "./index";

import {
  getFirestoreCollectionData,
  getDropdownItemArray,
} from "../../utils/firebaseUtils";

const OverviewPage = () => {
  const [hosty, setHosty] = useState();
  const [sizes, setSizes] = useState([]);
  const [waterDemands, setWaterDemands] = useState([]);
  const [sunDemands, setSunDemands] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let hostaList = [];

    async function fetchCollectionData() {
      let hostasResult = await getFirestoreCollectionData("hostas");
      if (!hostasResult) setError(true);
      hostaList = hostasResult.map((item, index) => {
        return <ListItemCard item={item} key={index} />;
      });
      let sizesResult = await getFirestoreCollectionData("sizes");
      if (!sizesResult) setError(true);
      let waterDemandsResult = await getFirestoreCollectionData("waterDemands");
      if (!waterDemandsResult) setError(true);
      let sunDemandsResult = await getFirestoreCollectionData("sunDemands");
      if (!sunDemandsResult) setError(true);
      let locationsResult = await getFirestoreCollectionData("locations");
      if (!locationsResult) setError(true);
      setSizes(getDropdownItemArray("size", sizesResult));
      setWaterDemands(getDropdownItemArray("demand", waterDemandsResult));
      setSunDemands(getDropdownItemArray("demand", sunDemandsResult));
      setLocations(getDropdownItemArray("location", locationsResult));
      setHosty(hostaList);
    }

    fetchCollectionData()
      .then()
      .catch((error) => {
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
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as="h1">Hosty</Header>
            </Grid.Column>
            <Grid.Column style={{ textAlign: "right" }}>
              <AddHostaModal
                sizes={sizes}
                waterDemands={waterDemands}
                sunDemands={sunDemands}
                locations={locations}
                triggerComponent={
                  <Button color="green" icon="plus" loading={loading} />
                }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <List divided size="huge" verticalAlign="middle">
          {hosty}
        </List>
      </Sidebar>
    </>
  );
};

export default OverviewPage;
