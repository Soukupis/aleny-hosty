import styled from "styled-components";
import { Segment, Grid } from "semantic-ui-react";

export const SidebarHeader = styled.div`
  display: flex !important;
`;
export const HeaderTitle = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
`;
export const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  margin: 10px;
`;
export const SidebarFooterItem = styled.i`
  margin: 10px !important;
  color: black;
`;
export const HeaderSegment = styled(Segment)`
  text-align: left;
  margin: 0px;
`;
export const FormRow = styled(Grid.Row)`
  padding-botttom: 0px !important;
`;
export const BottomFormRow = styled(Grid.Row)`
  padding-botttom: 0px !important;
  padding: 0px !important;
`;
