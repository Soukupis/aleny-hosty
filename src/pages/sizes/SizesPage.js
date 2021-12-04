import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components";
import { handleError, handleLoading } from "../../utils/messageUtils";
import { Button, Grid, Header, List } from "semantic-ui-react";
import { AddSizeModal, ListItemCard } from "./index";
import { getFirestoreCollectionData } from "../../utils/firebaseUtils";

const SizesPage = () => {
  const [sizes, setSizes] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let sizesList = [];

    async function fetchSizesData() {
      let sizesResult = await getFirestoreCollectionData("sizes");
      if (!sizesResult) setError(true);
      sizesResult = sizesResult.sort();
      sizesList = sizesResult.map((item, index) => {
        return <ListItemCard item={item} key={index} />;
      });
      setSizes(sizesList);
    }

    fetchSizesData()
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
              <Header as="h1">Velikosti</Header>
            </Grid.Column>
            <Grid.Column>
              <AddSizeModal
                triggerComponent={<Button color="green" icon="plus" />}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <List divided horizontal size="huge">
          {sizes}
        </List>
      </Sidebar>
    </>
  );
};

export default SizesPage;
