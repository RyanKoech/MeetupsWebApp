import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';

const NewMeetupPage = () => { 

  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type' : 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);
    router.replace('/');
  }

  return (
       <Fragment>
        <Head>
          <title>
            Add React Meetups
          </title>
          <meta 
            name='description'
            content='Add to list of react meetups'/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
       </Fragment>
  );
}

export default NewMeetupPage;