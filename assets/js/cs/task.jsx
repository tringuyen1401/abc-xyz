import React from 'react';
import { Card, CardBody } from 'reactstrap';

export default function Task(params) {
  let task = params.task;
  return <Card>
    <CardBody>
      <div>
        <p>Assigned To <b>{ task.user.name }</b></p>
        <p>Title { task.title }</p>
        <p>Description { task.description }</p>
        <p>{ task.is_complete? "Completed" : "Not completed" }</p>
        <p>{ task.assigned_at }</p>
      </div>
    </CardBody>
  </Card>;
}
