import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonIcon, IonLabel, IonList, IonItem, CreateAnimation, IonRefresher, IonRefresherContent, IonModal, IonButton } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { chevronForwardCircle, layers, albums, settingsOutline} from 'ionicons/icons';
import React, {Component} from 'react';
import { useParams } from 'react-router';
import Task from '../components/Task';
import './Upcoming.css';
import $ from "jquery";


interface UpcomingState {
    unsortedTasks: any,
    DSTasks: any,
    isEditing: String,
    showModal: boolean,
}

interface UpcomingProps {
    user: String,
    engine: any,
}

class Upcoming extends Component<UpcomingProps, UpcomingState>{

    constructor(props:any) {
        super(props);
        this.state = {unsortedTasks: [], DSTasks: [], isEditing: "", showModal: false};
    }

    async loadTasks() {
        let E = this.props.engine;
        let usr = this.props.user;
        let aval = await E.db.getItemAvailability(usr);
        let ibads = await E.db.getInboxandDS(usr, aval);
        this.setState({unsortedTasks: ibads[0], DSTasks: ibads[1]});
    }

    componentDidMount() {
        this.loadTasks()
    }

    render() {
        return (
        <IonPage>
        <IonHeader id="e" translucent={true}>
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
            <IonRefresher slot="fixed" onIonRefresh={(event: CustomEvent<RefresherEventDetail>)=>{
                this.loadTasks().then(
                   ()=>{setTimeout(()=>{
                       event.detail.complete()
                   }, 200)}
                )}
            }>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonHeader collapse="condense">
                    <IonToolbar class="head-toolbar">
                        <IonTitle size="large">Upcoming</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonLabel className="upcoming-sublabel">Unsorted</IonLabel>

                <IonList className="task-list">
                {this.state.unsortedTasks.map((tid: any) => {
                    return (<Task userID={this.props.user} engine={this.props.engine} taskID={tid} key={tid} onEdit={()=>{
                        this.setState({isEditing: tid, showModal: true});
                    }}/>)
                })}
                </IonList>
                <IonModal isOpen={this.state.showModal}>
                    <IonHeader translucent={true}>
                        <IonToolbar>
                            <IonButtons slot="end">
                                <IonButton onClick={() => this.setState({showModal: false})}>Close</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                </IonModal>
            </IonContent>
        </IonPage>
        );
    }
};

export default Upcoming;
