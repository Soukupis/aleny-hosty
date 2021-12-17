import React, { useEffect, useState } from "react";
import { LeafImage } from "../../assets/index";
import { Link } from "react-router-dom";
import {
  SidebarHeader,
  HeaderTitle,
  HeaderSegment,
  FormRow,
  BottomFormRow,
} from "./styles/SidebarStyle";
import {
  Segment,
  Grid,
  Header,
  Input,
  Form,
  Checkbox,
  Select,
  Divider,
  Menu,
  Dropdown,
  Modal,
  Button,
  Icon,
} from "semantic-ui-react";

import { getDropdownItemArray } from "../../utils/firebaseUtils";
import { handleLoading } from "../../utils/messageUtils";
import { LogoutButton } from "../index";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ children }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuWidth, setMenuWidth] = useState(null);
  const [latinName, setLatinName] = useState(false);
  const [czechName, setCzechName] = useState(false);
  const [sunDemands, setSunDemands] = useState(false);
  const [waterDemands, setWaterDemands] = useState(false);
  const [location, setLocation] = useState(false);
  const [size, setSize] = useState(false);
  const [sunDemandsSelectList, setSunDemandsSelectList] = useState([]);
  const [waterDemandsSelectList, setWaterDemandsSelectList] = useState([]);
  const [locationsSelectList, setLocationsSelectList] = useState([]);

  const { currentUser } = useAuth();

  const fetchCollectionData = async () => {
    let waterDemandDropdownArray = await getDropdownItemArray(
      "demand",
      "waterDemands"
    );
    let sunDemandDropdownArray = await getDropdownItemArray(
      "demand",
      "sunDemands"
    );
    let locationsDropdownArray = await getDropdownItemArray(
      "location",
      "locations"
    );
    setWaterDemandsSelectList(waterDemandDropdownArray);
    setSunDemandsSelectList(sunDemandDropdownArray);
    setLocationsSelectList(locationsDropdownArray);
  };

  useEffect(() => {
    setMenuWidth(document.getElementsByClassName("menu")[0].clientWidth);
    const unsubscribe = fetchCollectionData()
      .catch((error) => {
        setError(error);
      })
      .then((response) => {
        setLoading(false);
      });
    return unsubscribe;
  }, [currentUser]);
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
      <div
        id="top-menu"
        className="ui left fixed vertical menu hidden huge"
        style={{ overflowY: "scroll" }}
      >
        <Link to="/dashboard">
          <SidebarHeader className="item">
            <img className="ui mini image" alt="logo" src={LeafImage} />
            <HeaderTitle>Aleny Hosty</HeaderTitle>
          </SidebarHeader>
        </Link>
        <Segment>
          <Icon name="user" color="green" />
          <span>
            {currentUser?.email} <LogoutButton />
          </span>
        </Segment>
        <HeaderSegment basic>
          <Header
            as="h3"
            content="Filtry"
            subheader="Zde můžete filtrovat podle parametrů hosty"
          />
        </HeaderSegment>
        <Segment basic>
          <Form size="tiny">
            <Grid textAlign="left">
              <FormRow columns={2}>
                <Grid.Column>
                  <Form.Field style={{ marginTop: "10px" }}>
                    <Checkbox
                      label="Český název"
                      onClick={() => setCzechName(!czechName)}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <Input
                      icon="search"
                      disabled={!czechName}
                      placeholder="Český název"
                    />
                  </Form.Field>
                </Grid.Column>
              </FormRow>
              <FormRow columns={2}>
                <Grid.Column>
                  <Form.Field style={{ marginTop: "10px" }}>
                    <Checkbox
                      label="Latinský název"
                      onClick={() => setLatinName(!latinName)}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <Input
                      icon="search"
                      disabled={!latinName}
                      placeholder="Latinský název"
                    />
                  </Form.Field>
                </Grid.Column>
              </FormRow>
              <Divider clearing />

              <BottomFormRow>
                <Grid.Column>
                  <Form.Field>
                    <Checkbox
                      label="Nároky na slunce"
                      onClick={() => setSunDemands(!sunDemands)}
                    />
                  </Form.Field>
                </Grid.Column>
              </BottomFormRow>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Form.Field
                    control={Select}
                    options={sunDemandsSelectList}
                    placeholder="Nárok na slunce"
                    disabled={!sunDemands}
                  />
                </Grid.Column>
              </Grid.Row>
              <BottomFormRow>
                <Grid.Column>
                  <Form.Field>
                    <Checkbox
                      label="Nárok na vodu"
                      onClick={() => setWaterDemands(!waterDemands)}
                    />
                  </Form.Field>
                </Grid.Column>
              </BottomFormRow>
              <FormRow>
                <Grid.Column>
                  <Form.Field
                    control={Select}
                    options={waterDemandsSelectList}
                    placeholder="Nárok na vodu"
                    disabled={!waterDemands}
                  />
                </Grid.Column>
              </FormRow>
              <Divider clearing />
              <Grid.Row
                columns={1}
                style={{ paddingBottom: "0px", paddingTop: "0px" }}
              >
                <Grid.Column>
                  <Form.Field>
                    <Checkbox label="Velikost" onClick={() => setSize(!size)} />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <FormRow columns={2}>
                <Grid.Column>
                  <Form.Field
                    control={Input}
                    placeholder="min"
                    disabled={!size}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Field
                    control={Input}
                    placeholder="max"
                    disabled={!size}
                  />
                </Grid.Column>
              </FormRow>
              <Divider clearing />
              <Grid.Row
                columns={1}
                style={{ paddingBottom: "0px", paddingTop: "0px" }}
              >
                <Grid.Column>
                  <Form.Field>
                    <Checkbox
                      label="Poloha"
                      onClick={() => setLocation(!location)}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <FormRow>
                <Grid.Column>
                  <Form.Field
                    control={Select}
                    options={locationsSelectList}
                    placeholder="Poloha"
                    disabled={!location}
                  />
                </Grid.Column>
              </FormRow>
              <Divider clearing />
              <Grid.Row>
                <Segment basic style={{ paddingTop: "0px" }}>
                  <Menu size="large">
                    <Dropdown
                      item
                      text=" Vlastnosti"
                      style={{ marginTop: "6px" }}
                    >
                      <Dropdown.Menu>
                        <Link to="/locations">
                          <Dropdown.Item>Poloha</Dropdown.Item>
                        </Link>
                        <Link to="/sizes">
                          <Dropdown.Item>Velikost</Dropdown.Item>
                        </Link>
                        <Link to="/colors">
                          <Dropdown.Item>Barvy</Dropdown.Item>
                        </Link>
                        <Link to="/sun-demands">
                          <Dropdown.Item>Nároky na slunce</Dropdown.Item>
                        </Link>
                        <Link to="/water-demands">
                          <Dropdown.Item>Nároky na vodu</Dropdown.Item>
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu>
                </Segment>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
      </div>
      <div
        style={{
          marginLeft: menuWidth,
        }}
      >
        <Segment basic style={{ paddingLeft: "20px" }}>
          {children}
        </Segment>
      </div>
    </>
  );
};
export default Sidebar;
