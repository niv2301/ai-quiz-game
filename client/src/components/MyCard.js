import React from 'react';
import { Card } from 'react-bootstrap';

function MyCard() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>כותרת הכרטיס</Card.Title>
        <Card.Text>
          תוכן הכרטיס יכול לכלול תיאור או מידע נוסף.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
