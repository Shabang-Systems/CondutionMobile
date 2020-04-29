import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import './Page.css';

const Page: React.FC = () => {

  //const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
      <IonHeader>
          <IonText color="secondary">
              boo
          </IonText>
      </IonHeader>
    </IonPage>
  );
};

export default Page;
