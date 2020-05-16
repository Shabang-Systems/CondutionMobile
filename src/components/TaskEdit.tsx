import {IonHeader, IonToolbar, IonButtons, IonButton, IonModal, IonContent, IonInput, IonText, IonLabel, IonItem, IonDatetime } from '@ionic/react';

import React, {Component} from 'react';
import { chevronForwardCircle, layers, albums } from 'ionicons/icons';
import { Plugins, HapticsImpactStyle, HapticsNotificationType } from '@capacitor/core';
import './TaskEdit.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
import moment from "moment-timezone";

// TODO for Android: <uses-permission android:name="android.permission.VIBRATE" /> 

const { Haptics } = Plugins;

interface TaskEditState {
    taskInfo: any,
}

interface TaskEditProps {
    engine: any,
    userID: String,
    taskID: String,
    visibility: boolean,
    onHide: any;
}

class TaskEdit extends Component<TaskEditProps, TaskEditState>{
    constructor(props:any) {
        super(props);
        this.state = {taskInfo: {}};
    }


    componentDidMount() {
        if (this.props.taskID) {
            this.props.engine.db.getTaskInformation(this.props.userID, this.props.taskID).then((obj:any)=>this.setState({taskInfo: obj}));
        }
    }

    modify(prop:any, val:String) {
        let o:any = this.state.taskInfo;
        o[prop] = val;
        this.setState({taskInfo: o});
        let updateQuery:any = {};
        updateQuery[prop] = val;
        this.props.engine.db.modifyTask(this.props.taskID, updateQuery);
    }

    render() {
        return (
            <IonModal isOpen={this.props.visibility} onWillDismiss={()=> this.props.onHide()}>
                <IonHeader translucent={true}>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton onClick={() => this.props.onHide()}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                  <IonItem>
                    <IonLabel position="stacked">Task</IonLabel>
                    <IonInput type="text" placeholder="Bonteu" value={this.state.taskInfo.name}></IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Last Name</IonLabel>
                    <IonInput required type="text"></IonInput>
                  </IonItem>
                  
                  <IonItem>
                    <IonLabel position="floating">Title</IonLabel>
                    <IonInput></IonInput>
                  </IonItem>

                  <IonItem>
                      <IonLabel position="stacked">Date</IonLabel>
                      <IonDatetime displayFormat="MM DD YY" placeholder="Due" value={this.state.taskInfo.due} onIonChange={()=>{}}></IonDatetime>
                      <IonDatetime displayFormat="MM DD YY" placeholder="Defer" value={this.state.taskInfo.defer} onIonChange={()=>{}}></IonDatetime>
                  </IonItem>
                </IonContent>
            </IonModal>
      );
};
}

export default TaskEdit;

