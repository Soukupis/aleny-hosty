import React, { useEffect, useState } from "react";
import { Grid, List, Header, Button, Modal } from "semantic-ui-react";

import { Sidebar } from "../../components";
import { handleLoading } from "../../utils/messageUtils";
import { AddHostaModal, ListItemCard } from "./index";

import {
  getFirestoreCollectionData,
  getDropdownItemArray,
} from "../../utils/firebaseUtils";
import { useAuth } from "../../contexts/AuthContext";

const OverviewPage = () => {
  const [hosty, setHosty] = useState([]);
  const [sizes, setSizes] = useState();
  const [sunDemands, setSunDemands] = useState();
  const [locations, setLocations] = useState();
  const [colors, setColors] = useState();
  const [buyPlaces, setBuyPlaces] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState(null);

  const { isAdmin } = useAuth();

  useEffect(() => {
    async function fetchCollectionData(filter) {
      let hostasResult = await getFirestoreCollectionData("hostas");
      if (filter) {
        let is = false;
        let hostaResult1 = hostasResult.filter((item) => {
          console.log(filter);
          item.name.toUpperCase().includes(filter.name.toUpperCase()) &&
          item.latinName
            .toUpperCase()
            .includes(filter.latinName.toUpperCase()) &&
          item.sunDemand
            .toUpperCase()
            .includes(filter.sunDemand.toUpperCase()) &&
          item.location.toUpperCase().includes(filter.location.toUpperCase()) &&
          item.buyPlace.toUpperCase().includes(filter.buyPlace.toUpperCase())
            ? (is = true)
            : (is = false);

          return is;
        });
        hostasResult = hostaResult1;
      }
      if (!hostasResult) setError(true);
      let sizesDrop;
      if (!sizes) {
        sizesDrop = await getDropdownItemArray("size", "sizes");
        setSizes(sizesDrop);
      } else {
        sizesDrop = sizes;
      }
      let sunDemandsDrop;
      if (!sunDemands) {
        sunDemandsDrop = await getDropdownItemArray("demand", "sunDemands");
        setSunDemands(sunDemandsDrop);
      } else {
        sunDemandsDrop = sunDemands;
      }
      let locationsDrop;
      if (!locations) {
        locationsDrop = await getDropdownItemArray("location", "locations");
        setLocations(locationsDrop);
      } else {
        locationsDrop = locations;
      }
      let colorsDrop;
      if (!colors) {
        colorsDrop = await getDropdownItemArray("color", "colors");
        setColors(colorsDrop);
      } else {
        colorsDrop = colors;
      }
      let buyPlacesDrop;
      if (!buyPlaces) {
        buyPlacesDrop = await getDropdownItemArray("place", "buyPlaces");
        setBuyPlaces(buyPlacesDrop);
      } else {
        buyPlacesDrop = buyPlaces;
      }

      setHosty(
        hostasResult.map((item, index) => {
          return (
            <ListItemCard
              locations={locationsDrop}
              sizes={sizesDrop}
              sunDemands={sunDemandsDrop}
              colors={colorsDrop}
              buyPlaces={buyPlacesDrop}
              item={item}
              key={index}
              collection="hostas"
              setRemoving={setRemoving}
              setEditing={setEditing}
              setError={setError}
              setLoading={setLoading}
            />
          );
        })
      );
    }

    setLoading(true);

    const unsubscribe = fetchCollectionData(filter)
      .catch((error) => {
        setError(error);
      })
      .then(() => {
        setLoading(false);
      });
    return unsubscribe;
  }, [
    adding,
    editing,
    removing,
    filter,
    colors,
    locations,
    sunDemands,
    sizes,
    buyPlaces,
  ]);

  return (
    <>
      {handleLoading(loading)}
      {error ? (
        <Modal size="tiny" open={!!error} onClose={() => setError(false)}>
          <Modal.Header>Chyba</Modal.Header>
          <Modal.Content>
            <p>{error}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setError(false)}>
              Zavřít
            </Button>
          </Modal.Actions>
        </Modal>
      ) : (
        ""
      )}
      <Sidebar setFilter={setFilter}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as="h1">Hosty</Header>
            </Grid.Column>
            {isAdmin ? (
              <Grid.Column style={{ textAlign: "right" }}>
                <AddHostaModal
                  sizes={sizes}
                  sunDemands={sunDemands}
                  locations={locations}
                  colors={colors}
                  buyPlaces={buyPlaces}
                  triggerComponent={
                    <Button color="green" icon="plus" loading={loading} />
                  }
                  setAdding={setAdding}
                />
              </Grid.Column>
            ) : (
              <></>
            )}
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
