import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid} from 'uuid';

export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, updateActivity, loadActivity, loading, loadingPage} = activityStore;
    const {id} = useParams<{id: string}>();
    const history = useHistory();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        } else {
            activityStore.setLoadingPage(false);
        }
    }, [id, loadActivity])

    function handleSubmit() {
        if (!activity.id) {
            let newActivity = { ...activity, id : uuid() };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if (loadingPage) return <LoadingComponent content='Loading activity...' />

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
                <Button floated='right' type='button' content='Cancel' as={Link} to={activity.id ? `/activities/${activity.id}` : '/activities'} onChange={handleInputChange} />
            </Form>
        </Segment>
    )
})