import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const handleLoading = (loading) => {
  return loading ? (
    <Dimmer active>
      <Loader size="large" />
    </Dimmer>
  ) : null;
};

export const handleError = (error) => {
  return "";
};
