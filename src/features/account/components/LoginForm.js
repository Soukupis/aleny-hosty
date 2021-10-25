import React from "react"

const LoginForm = () =>{
    return (
        <form className="ui large form">
            <div className="field">
                <div className="ui left icon input">
                    <input type="text" placeholder="Enter Username" name="username"/>
                    <i className="user icon"></i>
                </div>
            </div>
            <div className="field">
                <div className="ui left icon input">
                    <input type="password" placeholder="Enter Password" name="password"/>
                    <i className="lock icon"></i>
                </div>
            </div>
            <div className="ui fluid large green submit button">Login</div>
        </form>
    )
}

export default LoginForm
