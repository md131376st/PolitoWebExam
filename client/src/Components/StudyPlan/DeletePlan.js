import {useNavigate} from "react-router-dom";
import { useState, useContext} from "react";
import UserContext from "../../UserContext";
import API from "../../api";
import {Alert, Button, Col, Container, Row} from "react-bootstrap";

const DeletePlan = (props) => {
	const navigate = useNavigate();
	const [error, setError] = useState(" ")
	const user = useContext(UserContext);
	const deletePlan = async (event) => {
		event.preventDefault();
		try {
			await API.DeleteStudyPlan(user.id);
			props.ChangeUserPType(0);
			navigate('/')
		} catch (e) {
			setError("the operation was not successful please try later")
		}

	}
	return (
		<Container>
			<Row>
				{error !== " " &&
					<Alert variant="primary"> {error}
					</Alert>
				}
				<Alert variant="primary"> are you sure you want to Delete your StudyPlan?
				</Alert>
			</Row>
			<Row>
				<Col>
					<Button variant="outline-primary" type="submit" onClick={deletePlan}>Yes</Button>
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
export default DeletePlan
