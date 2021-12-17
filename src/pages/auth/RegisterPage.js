import React from "react";

import Header from "./components/Header";
import RegisterForm from "./components/RegisterForm";

import { Grid } from "semantic-ui-react";
import { Row } from "./styles/AuthStyle";

const RegisterPage = () => {
  return (
    <Grid container columns={1}>
      <Row verticalAlign="middle" centered>
        <Grid.Column
          mobile={16}
          tablet={10}
          computer={6}
          className="center aligned"
        >
          <Header />
          <RegisterForm />
        </Grid.Column>
      </Row>
    </Grid>
  );
};
export default RegisterPage;
