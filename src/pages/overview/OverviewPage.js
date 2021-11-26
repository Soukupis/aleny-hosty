import React, { useEffect, useState } from "react";
import db from "../../../src/firebase";
import { Grid, List, Header, Button } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading, handleError } from "../../utils/messageUtils";
import { AddHostaModal, ListItemCard, SearchInput } from "./index";

const OverviewPage = () => {
  const [hosty, setHosty] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFirestoreHostaCollectionData = () => {
    db.firestore()
      .collection("hostas")
      .get()
      .then((response) => {
        let hostaList = [];
        response.forEach((item) => {
          hostaList.push(item.data());
        });
        hostaList = hostaList.map((item, index) => {
          return <ListItemCard item={item} key={index} />;
        });
        setHosty(hostaList);
      })
      .catch((error) => {
        setError(true);
      });
  };

  useEffect(() => {
    setLoading(true);
    getFirestoreHostaCollectionData();
    setLoading(false);
  }, []);
  return (
    <>
      {handleError(error)}
      {handleLoading(loading)}
      <Sidebar>
        <Grid>
          <Grid.Row>
            <Grid.Column width="eight" floated="left">
              <Header as="h1">Hosty</Header>
            </Grid.Column>

            <div className="right floated">
              <SearchInput />
            </div>
            <AddHostaModal
              triggerComponent={<Button color="green" icon="plus" />}
            />
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
