import React from 'react'

import Header from "../components/Header"
import LoginForm from "../components/LoginForm"

import { Grid } from 'semantic-ui-react'
import {Row} from "../styles/LoginScreenStyle"



const LoginScreen = () => {
    return(
        <Grid container columns={1}>
            <Row verticalAlign="middle" centered>
                <Grid.Column mobile={16} tablet={10} computer={8} className="center aligned">
                    <Header/>
                    <LoginForm/>
                </Grid.Column>
            </Row>
        </Grid>
        )
}
export default LoginScreen;
