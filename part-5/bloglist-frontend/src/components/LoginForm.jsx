
//yo tala dekha ko chae handleLogin, username, password, 
// handleUsernameChange,
// handlePasswordChange,
// passed here i think ok

// remember so like in the app.jsx 
//<LoginForm 
  //  handleLogin={someFunction}
    //username={usernameState}
//> 



const LoginForm =({ 
    handleLogin,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
}) =>{


    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={handleUsernameChange}
                        id="username"
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        id="password"
                    />
                    <button className="submit" id="login-button">
                        login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;