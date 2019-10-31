import React from 'react';
import FriendList from "../components/FriendList";
import Col from '../components/Col';
import Row from '../components/Row';
function Dashboard() {
    return (
        <Row> 
            <Col>
                <h1>Friendlist</h1>
                <FriendList name="Harrison Schaen" />
            </Col>
        </Row>
    );
}
export default Dashboard;