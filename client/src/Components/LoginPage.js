import {useState} from 'react';
import {Form, Button, Row, Col, Container, Alert} from 'react-bootstrap';
import "./loginPage.css"
import {Outlet, useNavigate} from "react-router-dom";

export function LoginPage(props) {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = (event) => {
		event.preventDefault();
		const credentials = {username, password};
		props.login(credentials);
	};

	return (
		<Container>
			<Row>
				<h2> Login Form </h2>
			</Row>
			{props.err &&
				<Alert variant="danger"> {props.err} </Alert>
			}
			<Row>
				<Col xs={3}/>

				<Col>
					<Form onSubmit={handleSubmit}>

						<Form.Group controlId='username'>
							<Form.Label>email</Form.Label>
							<Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)}
							              required={true}/>
						</Form.Group>

						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)}
							              required={true} minLength={3}/>
						</Form.Group>

						<Button id="submitButtonLogin" type="submit">Login</Button>
					</Form>
				</Col>
				<Col xs={3}/>
			</Row>
		</Container>

	)
}

export function LogoutButton(props) {
	const navigate = useNavigate();
	return (
		<Container>
			<Row>
				<Alert variant="primary"> are you sure you want to logout?
				</Alert>
			</Row>
			<Row>
				<Col>
					<Button variant="outline-primary" onClick={props.logout}>Yes</Button>
				</Col>
				<Col>
					<Button variant="outline-danger" onClick={() => {
						navigate('/')
					}}>no</Button>
				</Col>
			</Row>
		</Container>
	)
}


