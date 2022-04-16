import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (actvitiy: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({activity: selectedActivity, createOrEdit, closeForm, submitting}: Props) {

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        createOrEdit(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input name='title' placeholder='Title' value={activity.title} onChange={handleInputChange} />
                <Form.TextArea name='description' placeholder='Description' value={activity.description} onChange={handleInputChange} />
                <Form.Input name='category' placeholder='Category' value={activity.category} onChange={handleInputChange} />
                <Form.Input type='date' name='date' placeholder='Date' value={activity.date} onChange={handleInputChange} />
                <Form.Input name='city' placeholder='City' value={activity.city} onChange={handleInputChange} />
                <Form.Input name='venue' placeholder='Venue' value={activity.venue} onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' onChange={handleInputChange} loading={submitting} />
                <Button floated='right' type='button' content='Cancel' onClick={closeForm} onChange={handleInputChange} />
            </Form>
        </Segment>
    )
}