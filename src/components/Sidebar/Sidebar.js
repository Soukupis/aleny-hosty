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
  Dropdown,
  Modal,
  Button,
  Icon,
} from "semantic-ui-react";

import { Formik } from "formik";

import { getDropdownItemArray } from "../../utils/firebaseUtils";
import { handleLoading } from "../../utils/messageUtils";
import { LogoutButton } from "../index";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ children, setFilter }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuWidth, setMenuWidth] = useState(null);
  const [latinName, setLatinName] = useState(false);
  const [czechName, setCzechName] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [sunDemands, setSunDemands] = useState(false);
  const [buyPlaces, setBuyPlaces] = useState(false);
  const [location, setLocation] = useState(false);
  const [size, setSize] = useState(false);
  const [sunDemandsSelectList, setSunDemandsSelectList] = useState([]);
  const [locationsSelectList, setLocationsSelectList] = useState([]);
  const [buyPlacesSelectList, setBuyPlacesSelectList] = useState([]);

  const { auth, isAdmin, currentUser } = useAuth();

  const fetchCollectionData = async () => {
    let sunDemandDropdownArray = await getDropdownItemArray(
      "demand",
      "sunDemands"
    );
    let locationsDropdownArray = await getDropdownItemArray(
      "location",
      "locations"
    );
    let buyPlacesDropdownArray = await getDropdownItemArray(
      "place",
      "buyPlaces"
    );
    setBuyPlacesSelectList(buyPlacesDropdownArray);
    setSunDemandsSelectList(sunDemandDropdownArray);
    setLocationsSelectList(locationsDropdownArray);
  };

  useEffect(() => {

    setMenuWidth(window.innerWidth < 600 ? 0 :document.getElementsByClassName("menu")[0].clientWidth);
    const unsubscribe = fetchCollectionData()
      .catch((error) => {
        setError(error);
      })
      .then((response) => {
        setLoading(false);
      });
    return unsubscribe;
  }, [auth]);

  const resetFilter = () => {
    setFilter(null);
  };

  return (
    <>
      {handleLoading(loading)}
      {error ? (
        <Modal size="tiny" open={!!error} onClose={() => setError("")}>
          <Modal.Header>Chyba</Modal.Header>
          <Modal.Content>
            <p>{error}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => setError("")}>
              Zavřít
            </Button>
          </Modal.Actions>
        </Modal>
      ) : (
        ""
      )}
      <div
        className="ui left fixed vertical menu hidden huge"
        style={{ overflowY: "scroll", display: `${window.innerWidth < 600 ? "none" : ""}`}}
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
        <HeaderSegment basic style={{ margin: "0px" }}>
          <Header
            as="h3"
            content="Filtry"
            subheader="Zde můžete filtrovat podle parametrů hosty"
          />
        </HeaderSegment>
        {isAdmin ? (
          <>
            <Segment basic style={{ paddingTop: "0px" }}>
              <Dropdown
                placeholder="Vlastnosti hosty"
                fluid
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
                  <Link to="/buy-places">
                    <Dropdown.Item>Pořizovací místa</Dropdown.Item>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </Segment>
            <Divider clearing />
            <Segment basic>
              <Button onClick={() => resetFilter()} negative fluid>
                Resetovat filtr
              </Button>
            </Segment>
          </>
        ) : (
          <>
            <Divider clearing />
            <Segment basic>
              <Button onClick={() => resetFilter()} negative fluid>
                Resetovat filtr
              </Button>
            </Segment>
          </>
        )}
        <Formik
          initialValues={{
            idNumber: "",
            name: "",
            latinName: "",
            sunDemand: "",
            location: "",
            buyPlace: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setFilter({
              idNumber: values.idNumber,
              name: values.name,
              latinName: values.latinName,
              sunDemand: values.sunDemand,
              location: values.location,
              buyPlace: values.buyPlace,
            });
            setSubmitting(false);
          }}
        >
          {({
            values,
            setFieldValue,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            const handleChange = (e, { name, value }) => {
              setFieldValue(name, value);
            };
            return (
              <Segment basic>
                <Form size="tiny" onSubmit={handleSubmit}>
                  <Grid textAlign="left">
                    <FormRow columns={2}>
                      <Grid.Column>
                        <Form.Field style={{ marginTop: "10px" }}>
                          <Checkbox
                              label="Pořadové číslo"
                              onClick={() => {
                                setIdNumber(!idNumber);
                                values.id = "";
                              }}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field
                            name="idNumber"
                            icon="search"
                            control={Input}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.idNumber}
                            disabled={!idNumber}
                            placeholder="Pořadové číslo"
                        />
                      </Grid.Column>
                    </FormRow>
                    <FormRow columns={2}>
                      <Grid.Column>
                        <Form.Field style={{ marginTop: "10px" }}>
                          <Checkbox
                            label="Český název"
                            onClick={() => {
                              setCzechName(!czechName);
                              values.name = "";
                            }}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field
                          name="name"
                          icon="search"
                          control={Input}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          disabled={!czechName}
                          placeholder="Český název"
                        />
                      </Grid.Column>
                    </FormRow>
                    <FormRow columns={2}>
                      <Grid.Column>
                        <Form.Field style={{ marginTop: "10px" }}>
                          <Checkbox
                            label="Latinský název"
                            onClick={() => {
                              setLatinName(!latinName);
                              values.latinName = "";
                            }}
                          />
                        </Form.Field>
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field
                          name="latinName"
                          icon="search"
                          control={Input}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.latinName}
                          disabled={!latinName}
                          placeholder="Latinský název"
                        />
                      </Grid.Column>
                    </FormRow>
                    <Divider clearing />

                    <BottomFormRow>
                      <Grid.Column>
                        <Form.Field>
                          <Checkbox
                            label="Nároky na slunce"
                            onClick={() => {
                              setSunDemands(!sunDemands);
                              values.sunDemand = "";
                            }}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </BottomFormRow>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Form.Field
                          control={Select}
                          name="sunDemand"
                          options={sunDemandsSelectList}
                          placeholder="Nárok na slunce"
                          disabled={!sunDemands}
                          onChange={handleChange}
                          value={values.sunDemand}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <BottomFormRow>
                      <Grid.Column>
                        <Form.Field>
                          <Checkbox
                            label="Místo pořízení"
                            onClick={() => {
                              setBuyPlaces(!buyPlaces);
                              values.buyPlace = "";
                            }}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </BottomFormRow>
                    <Grid.Row columns={1}>
                      <Grid.Column>
                        <Form.Field
                          control={Select}
                          name="buyPlace"
                          options={buyPlacesSelectList}
                          placeholder="Místo pořízení"
                          disabled={!buyPlaces}
                          onChange={handleChange}
                          value={values.buyPlace}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Divider clearing />
                    <Grid.Row
                      columns={1}
                      style={{ paddingBottom: "0px", paddingTop: "0px" }}
                    >
                      <Grid.Column>
                        <Form.Field>
                          <Checkbox
                            label="Velikost"
                            onClick={() => setSize(!size)}
                          />
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
                            onClick={() => {
                              setLocation(!location);
                              values.location = "";
                            }}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Form.Field
                          name="location"
                          control={Select}
                          options={locationsSelectList}
                          placeholder="Poloha"
                          disabled={!location}
                          onChange={handleChange}
                          value={values.location}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Button type="submit" disabled={isSubmitting}>
                          Aplikovat filtr
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </Segment>
            );
          }}
        </Formik>
      </div>

        <Segment basic style={{ paddingLeft: "20px", marginLeft:menuWidth, }}>
          {children}
        </Segment>
    </>
  );
};
export default Sidebar;
