import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Page: React.FC = () => {

  //const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonText color="secondary">
        <h1>H1: The quick brown fox jumps over the lazy dog</h1>
      </IonText>
    </IonPage>
  );
};

export default Page;
