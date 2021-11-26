import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components";
import { handleError, handleLoading } from "../../utils/messageUtils";
import { Button, Grid, Header, List } from "semantic-ui-react";
import { AddSizeModal, ListItemCard } from "./index";
import { SearchInput } from "../../components/index.js";
import db from "../../firebase";
import { AddHostaModal } from "../overview";

const SizesPage = () => {
  const [sizes, setSizes] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFirestoreSizesCollectionData = () => {
    db.firestore()
      .collection("sizes")
      .get()
      .then((response) => {
        let sizesList = [];
        response.forEach((item) => {
          sizesList.push(item.data());
        });
        sizesList = sizesList.map((item, index) => {
          return <ListItemCard item={item} key={index} />;
        });
        setSizes(sizesList);
      })
      .catch((error) => {
        setError(true);
      });
  };

  useEffect(() => {
    setLoading(true);
    getFirestoreSizesCollectionData();
    setLoading(false);
  }, []);
  return (
    <>
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

              <div className="right floated">
                <SearchInput />
              </div>
              <AddSizeModal
                triggerComponent={<Button color="green" icon="plus" />}
              />
            </Grid.Row>
          </Grid>
          <List divided horizontal size="huge">
            {sizes}
          </List>
        </Sidebar>
      </>
      );
    </>
  );
};

export default SizesPage;
