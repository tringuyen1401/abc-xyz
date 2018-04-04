import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function TaskForm(props) {
  console.log("props@TaskForm", props);

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_TASK_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_task(props.task_form);
    console.log(props.task_form);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_TASK_FORM',
    });
  }

  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>New Task</h2>
    <FormGroup>
      <Label for="user_id">Assignee</Label>
      <Input type="select" name="user_id" value={props.task_form.user_id} onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="textarea" name="title" value={props.task_form.title} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="textarea" name="description" value={props.task_form.description} onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="complete">Is complete</Label>
      <Input type="checkbox" name="complete" value={props.task_form.complete} onChange={update} />
    </FormGroup>
  <Button onClick={submit} color="primary">Create</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
}

function state2props(state) {
  console.log("rerender@TaskForm", state);
  return {
    task_form: state.task_form,
    users: state.users,
  };
}

export default connect(state2props)(TaskForm);

