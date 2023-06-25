import "./LoginPage.css"
import { useState } from 'react';
import { Container, Form, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // Perform email validation and check if it exists in the database
  // Set isNewUser based on whether the email is found in the database
  const handleContinue = async () => {
    if (validateEmail()) {
      try {
        const response = await axios.post('/api/checkEmail', { email }); // Replace '/api/checkEmail' with actual API endpoint once created
        const { isNewUser } = response.data; // Assuming the response from the server includes a data property 'isNewUser'
  
        setIsNewUser(isNewUser);
      } catch (error) {
        console.log('Error checking email:', error);
      }
    }
  };

  // Logs user into their account if credentials are verified in back-end
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password }); // Replace '/api/login' with actual API endpoint for login
      // Handle the response or perform necessary actions after successful login
    } catch (error) {
      console.log('Error logging in:', error);
    }
  };

  // Creates a user's account if credentials are verified in back-end
  const handleCreateAccount = async () => {
    try {
      const response = await axios.post('/api/createAccount', { email, password }); // Replace '/api/createAccount' with your actual API endpoint for account creation
      // Handle the response or perform necessary actions after successful account creation
    } catch (error) {
      console.log('Error creating account:', error);
    }
  };
  

  // Toggles between showing password in password input
  const handleShowPasswordToggle = (e: any) => {
    console.log(e);
    setShowPassword(e.target.checked);
  }

  // Check if input email is in correct email format
  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValid = emailRegex.test(email) 
    setEmailValid(isValid);
    return isValid;
  };

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
            isInvalid={!emailValid}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!emailValid && <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>}
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