import MeetupList from '../components/meetups/MeetupList';
import Layout from '../components/layout/Layout';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

const HomePage = ({meetups}) => {
  return (
      <Fragment>
        <Head>
          <title>
            React Meetups
          </title>
          <meta 
            name='description'
            content='Browse list of react meetups'/>
        </Head>
        <MeetupList meetups={meetups}/>
      </Fragment>
  )
}

export const getStaticProps = async () => {

  const connectString = process.env.REACT_APP_MONGO_CONNECTION_STRING;

  const client = await MongoClient.connect(connectString);

  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  };

}

// export const getServerSideProps = (context) => {

//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     },
//   };
// }

export default HomePage;