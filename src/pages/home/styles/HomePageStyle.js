import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import { Background } from "../../../assets/index";

export const Container = styled(Grid)`
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
`;
export const Card = styled.div`
  margin: auto !important;
  box-shadow: none !important;
`;
export const CardHeader = styled.div`
  margin-top: 10px;
`;
export const CardContent = styled.div`
  display: flex;
  justify-content: center;
`;
