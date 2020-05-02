import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonIcon, IonLabel, IonList, IonItem } from '@ionic/react';
import { chevronForwardCircle, layers, albums, settingsOutline} from 'ionicons/icons';
import React, {Component} from 'react';
import { useParams } from 'react-router';
import Task from '../components/Task';
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
            <IonHeader translucent={true}>
                <IonToolbar class="head-toolbar">
                    <IonButtons slot="start"> 
                        <IonMenuButton />
                     </IonButtons>
                     <IonButtons slot="end"> 
                        <IonIcon icon={settingsOutline} class="rhead"></IonIcon>
                    </IonButtons>
                    <IonTitle>Upcoming</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>
                <IonHeader collapse="condense">
                    <IonToolbar class="head-toolbar">
                        <IonTitle size="large">Upcoming</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonLabel className="upcoming-badge">Unsorted</IonLabel>
                <IonList className="task-list">
                    <Task userID={this.props.user} engine={this.props.engine} taskID="5u0iADGGyrZVGkux8n0i"/>
                    <Task userID={this.props.user} engine={this.props.engine} taskID="5u0iADGGyrZVGkux8n0i"/>
                    <Task userID={this.props.user} engine={this.props.engine} taskID="5u0iADGGyrZVGkux8n0i"/>
                </IonList>
            </IonContent>
        </IonPage>
        );
    }
};

export default Upcoming;
