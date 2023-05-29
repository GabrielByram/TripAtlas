import "./LoginPage.css"
import { useState } from 'react';
import { Container, Form, Button, ButtonGroup, Row, Col } from 'react-bootstrap';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const handleContinue = () => {
    // Perform email validation and check if it exists in the database
    // Set isNewUser based on whether the email is found in the database
    setIsNewUser(true); // For demonstration purposes, set isNewUser to true
  };

  const handleLogin = () => {
    // Perform login with the email and password
    // Redirect or perform necessary actions after successful login
  };

  const handleCreateAccount = () => {
    // Perform account creation with the email and password
    // Redirect or perform necessary actions after successful account creation
  };

  const handleShowPasswordToggle = (e: any) => {
    console.log(e);
    setShowPassword(e.target.checked);
  }

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h1 className="text-center">LOGIN</h1>
      <Form className="w-50">
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {!isNewUser ? (
          <div>
            <Button className="login-button" variant="primary" onClick={handleContinue}>
              Continue
            </Button>
            <div className="text-center mt-3">
              <p>Or log in with:</p>
              <Button variant="outline-primary">Google Account</Button>
            </div>
            <div className="text-center mt-3">
              <p>Not a member? Sign up here</p>
            </div>
          </div>
        ) : (
          <div>
            <div style={{marginTop: "15px"}}>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </Form.Group>
              <Form.Group controlId="formRememberMe">
                <div className="d-flex justify-content-between">
                    <Form.Check type="checkbox" label="Remember me" />
                    <div>
                      <Form.Check type="checkbox" label="Show Password" onClick={(e) => handleShowPasswordToggle(e)}/>
                      <Button variant="link" style={{float: "right", padding: "0", marginTop: "-5px"}}>
                        Forgot Password?
                      </Button>
                    </div>
                </div>
              </Form.Group>
            </div>
            <div>
              <Button variant="primary" onClick={handleLogin} className="login-button">
                Login
              </Button>
            </div>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default LoginPage