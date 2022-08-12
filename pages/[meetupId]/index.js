import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetails = ({meetupData}) => {
  return (
    <Fragment>
      <Head>
        <title>
          {meetupData.title}
        </title>
        <meta 
          name='description'
          content={meetupData.description}/>
      </Head>
      <MeetupDetail title={meetupData.title} address={meetupData.address} image={meetupData.image} description={meetupData.description}/>
    </Fragment>
  )
}

export const getStaticPaths = async () => { 

  const connectString = process.env.REACT_APP_MONGO_CONNECTION_STRING;

  const client = await MongoClient.connect(connectString);

  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const meetups = await meetupCollection.find({}, {_id : 1}).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map(meetup => (
      {
        params: {
          meetupId : meetup._id.toString()
        }
      }
    ))
  }
}

export const getStaticProps = async (context) => {

  const connectString = process.env.REACT_APP_MONGO_CONNECTION_STRING;
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  

  const client = await MongoClient.connect(connectString);

  const db = client.db();

  const meetupCollection = db.collection('meetups');

  const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupId)});

  console.log(selectedMeetup)

  client.close();

  return {
    props: {
      meetupData :  {
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description : selectedMeetup.description,
        id: selectedMeetup._id.toString()
      }
    }
  }
}

export default MeetupDetails;