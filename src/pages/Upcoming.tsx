import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonIcon, IonLabel, IonList, IonItem } from '@ionic/react';
import { chevronForwardCircle, layers, albums } from 'ionicons/icons';
import React, {Component} from 'react';
import { useParams } from 'react-router';
import './Upcoming.css';


interface UpcomingState {
}

interface UpcomingProps {
    user: String,
    engine: any,
}

class Upcoming extends Component<UpcomingProps, UpcomingState>{

    constructor(props:any) {
        super(props);
    }

    render() {
        return (
        <IonPage>
            <IonHeader>
                <IonToolbar class="head-toolbar">
                    <IonButtons slot="start"> 
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle slot="start">Upcoming</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            </IonContent>
        </IonPage>
        );
    }
};

export default Upcoming;
