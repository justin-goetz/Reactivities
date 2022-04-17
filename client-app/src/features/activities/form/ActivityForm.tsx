import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

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
        activity.id ? updateActivity(activity) : createActivity(activity);
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
                <Button floated='right' positive type='submit' content='Submit' onChange={handleInputChange} loading={loading} />
                <Button floated='right' type='button' content='Cancel' onClick={closeForm} onChange={handleInputChange} />
            </Form>
        </Segment>
    )
})