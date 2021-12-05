import React from "react";
import { Dimmer, Loader, Message } from "semantic-ui-react";

export const handleLoading = (loading) => {
  return loading ? (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ) : null;
};

export const handleError = (error) => {
  console.log("error");
  return error ? (
    <Message negative>
      <Message.Header>We're sorry we can't apply that discount</Message.Header>
      <p>That offer has expired</p>
    </Message>
  ) : null;
};
