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
} from "semantic-ui-react";

const Sidebar = ({ children }) => {
  const [menuWidth, setMenuWidth] = useState();
  const [latinName, setLatinName] = useState(false);
  const [czechName, setCzechName] = useState(false);
  const [sunDemands, setSunDemands] = useState(false);
  const [waterDemands, setWaterDemands] = useState(false);
  const [location, setLocation] = useState(false);
  const [frostResistance, setFrostResistance] = useState(false);
  const [size, setSize] = useState(false);
  const [sizeRangeStart, setSizeRangeStart] = useState(false);
  const [sizeRangeEnd, setSizeRangeEnd] = useState(false);
  const countryOptions = [
    { key: "af", value: "af", text: "Afghanistan" },
    { key: "ax", value: "ax", text: "Aland Islands" },
    { key: "al", value: "al", text: "Albania" },
    { key: "dz", value: "dz", text: "Algeria" },
    { key: "as", value: "as", text: "American Samoa" },
    { key: "ad", value: "ad", text: "Andorra" },
    { key: "ao", value: "ao", text: "Angola" },
    { key: "ai", value: "ai", text: "Anguilla" },
    { key: "ag", value: "ag", text: "Antigua" },
    { key: "ar", value: "ar", text: "Argentina" },
    { key: "am", value: "am", text: "Armenia" },
    { key: "aw", value: "aw", text: "Aruba" },
    { key: "au", value: "au", text: "Australia" },
    { key: "at", value: "at", text: "Austria" },
    { key: "az", value: "az", text: "Azerbaijan" },
    { key: "bs", value: "bs", text: "Bahamas" },
    { key: "bh", value: "bh", text: "Bahrain" },
    { key: "bd", value: "bd", text: "Bangladesh" },
    { key: "bb", value: "bb", text: "Barbados" },
    { key: "by", value: "by", text: "Belarus" },
    { key: "be", value: "be", text: "Belgium" },
    { key: "bz", value: "bz", text: "Belize" },
    { key: "bj", value: "bj", text: "Benin" },
  ];
  useEffect(() => {
    setMenuWidth(document.getElementsByClassName("menu")[0].clientWidth);
  }, []);
  const openEmailClient = (e) => {
    window.location = "mailto:joseph.soukup@outlook.com";
    e.preventDefault();
  };
  return (
    <>
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
                    options={countryOptions}
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
                    options={countryOptions}
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
                    options={countryOptions}
                    placeholder="min"
                    disabled={!sizeRangeStart}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Field
                    control={Input}
                    options={countryOptions}
                    placeholder="max"
                    disabled={!sizeRangeEnd}
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
                    options={countryOptions}
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

/*
* <Segment>
          <SidebarFooter>
            <Link to="/account">
              <SidebarFooterItem className="user icon large link"></SidebarFooterItem>
            </Link>
            <Link to="/settings">
              <SidebarFooterItem className="settings icon large link"></SidebarFooterItem>
            </Link>
            <Link to="/email">
              <SidebarFooterItem
                className="paper plane icon large link"
                onClick={openEmailClient}
              ></SidebarFooterItem>
            </Link>
            <LogoutButton />
          </SidebarFooter>
        </Segment>*/

/*
*
*
    <div id="top-menu" className="ui left fixed vertical menu">
        <Link to="/dashboard">
            <SidebarHeader className="item">
                <img className="ui mini image" alt="logo" src={LeafImage}/>
                <HeaderTitle>Aleny Hosty</HeaderTitle>
            </SidebarHeader>
        </Link>
        <Link className="item" to="/overview">
            <i className="th icon"></i>
            Přehled
        </Link>
        <Link className="item" to="/sun-demands">
            <i className="sun icon"></i>
            Nároky na slunce
        </Link>
        <Link className="item" to="/water-demands">
            <i className="tint icon"></i>
            Nároky na vláhu
        </Link>
        <Link className="item" to="/frost-resistance">
            <i className="snowflake icon"></i>
            Mrazuvzdornost
        </Link>
        <Link className="item" to="/locations">
            <i className="map icon"></i>
            Umístění
        </Link>
        <Link className="item" to="/calendar">
            <i className="calendar alternate icon"></i>
            Kalendář
        </Link>
        <SidebarFooter>
            <Link to="/account">
                <SidebarFooterItem
                    className="user icon large link"></SidebarFooterItem>
            </Link>
            <Link to="/settings">
                <SidebarFooterItem
                    className="settings icon large link"></SidebarFooterItem>
            </Link>
            <Link to="/email">
                <SidebarFooterItem
                    className="paper plane icon large link"
                    onClick={openEmailClient}
                ></SidebarFooterItem>
            </Link>
            <LogoutButton/>
        </SidebarFooter>
    </div>
    <div
        style={{
            marginLeft: menuWidth,
        }}
    >
        <div className="ui basic segment">{children}</div>
    </div>
*/
