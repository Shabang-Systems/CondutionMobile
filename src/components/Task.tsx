import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonText, IonCheckbox} from '@ionic/react';

import React, {Component} from 'react';
import { chevronForwardCircle, layers, albums } from 'ionicons/icons';
import { Plugins, HapticsImpactStyle, HapticsNotificationType } from '@capacitor/core';
import './Task.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";

// TODO for Android: <uses-permission android:name="android.permission.VIBRATE" /> 

const { Haptics } = Plugins;

interface TaskState {
    name: String,
}

interface TaskProps {
    engine: any,
    userID: String,
    taskID: String,
}

class Task extends Component<TaskProps, TaskState>{
    constructor(props:any) {
        super(props);
        this.state = {name: ""};
    }

    componentDidMount() {
        let cmp = this;
        this.props.engine.db.getTaskInformation(this.props.userID, this.props.taskID).then(function(e:any) {
            cmp.setState({name: e.name});
        });
    }

    render() {
        return (
            <IonItem id={this.props.taskID.toString()}>
            <IonCheckbox onIonChange={(e) => {
                if(e.detail.checked) {

                    $('#'+this.props.taskID).animate({"margin": "5px 0 5px 0 !important"}, 200);
                    $("#"+this.props.taskID).slideUp(300);
                    $('#'+this.props.taskID).css({"opacity": "0.6", "text-decoration": "line-through"});
                    Haptics.notification({type: HapticsNotificationType.SUCCESS});
            }
        }}></IonCheckbox>
            <IonLabel>{this.state.name}</IonLabel>
        </IonItem>
    );
};
}

export default Task;

