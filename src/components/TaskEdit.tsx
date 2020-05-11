import {IonHeader, IonToolbar, IonButtons, IonButton, IonModal, IonContent } from '@ionic/react';

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
    }

    componentDidMount() {
    }

    render() {
        return (
            <IonModal isOpen={this.props.visibility}>
                <IonHeader translucent={true}>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton onClick={() => this.props.onHide()}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    Waaaa wawawam, wawawawawawam. Wa wah wa wah wah wa wam. 

                    Waaaa wawawam, wawawawawawam. Wa wah wa wah wah wa wam. 

                    (Ba dum dum dum)

                    Waaaa ch* wawawam ch*, wawach*wawawawam ch*. Wa ch* wah wa wah ch* wah wa wam. 
                </IonContent>
            </IonModal>
      );
};
}

export default TaskEdit;

