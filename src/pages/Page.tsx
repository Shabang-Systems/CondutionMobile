import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import './Page.css';

const Page: React.FC = () => {

  //const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar class="head-toolbar">
                <IonButtons slot="start"> 
                    <IonMenuButton />
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    </IonPage>
  );
};

export default Page;
