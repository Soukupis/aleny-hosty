import React from "react";
import { Grid } from "semantic-ui-react";
import { Row } from "../auth/styles/AuthStyle";
import { LeafImage } from "../../assets/index";
import { Link } from "react-router-dom";

import {
  Container,
  Card,
  CardHeader,
  CardContent,
} from "./styles/HomePageStyle";

const HomePage = () => {
  return (
    <Container columns={1}>
      <Row verticalAlign="middle" centered>
        <Grid.Column
          mobile={16}
          tablet={10}
          computer={10}
          className="center aligned"
        >
          <Card className="ui card">
            <div className="content">
              <CardHeader className="ui huge header">
                <img
                  src={LeafImage}
                  alt="leaf-logo"
                  className="ui circular image"
                />
                Aleny Hosty
              </CardHeader>
            </div>
            <CardContent className="content">
              <div className="ui big button green">
                <Link style={{ color: "white" }} to="/login">
                  Přihlášení
                </Link>
              </div>
              <div className="ui big button blue">
                <Link style={{ color: "white" }} to="/register">
                  Registrace
                </Link>
              </div>
            </CardContent>
          </Card>
        </Grid.Column>
      </Row>
    </Container>
  );
};
export default HomePage;
