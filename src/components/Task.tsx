import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonText, IonCheckbox} from '@ionic/react';

import React, {Component} from 'react';
import { chevronForwardCircle, layers, albums } from 'ionicons/icons';
import { Plugins, HapticsImpactStyle, HapticsNotificationType } from '@capacitor/core';
import './Task.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
import moment from "moment-timezone";

// TODO for Android: <uses-permission android:name="android.permission.VIBRATE" /> 

const { Haptics } = Plugins;

interface TaskState {
    name: String,
    style: String
}

interface TaskProps {
    engine: any,
    userID: String,
    taskID: String,
}

class Task extends Component<TaskProps, TaskState>{
    constructor(props:any) {
        super(props);
        this.state = {name: "", style: ""};
    }

    private numDaysBetween(d1: Date, d2: Date) {
        let diff = Math.abs(d1.getTime() - d2.getTime());
        return diff / (1000 * 60 * 60 * 24);
    };


    componentDidMount() {
        let cmp = this;
        this.props.engine.db.getTaskInformation(this.props.userID, this.props.taskID).then(function(e:any) {
            let defer_current;
            let due_current;
            if(e.isFloating) {
                defer_current = e.defer ? moment(e.defer).tz(e.timezone).local(true).toDate() : undefined; 
                due_current = e.due ? moment(e.due).tz(e. timezone).local(true).toDate() : undefined;
            } else {
                defer_current = e.defer;
                due_current = e.due;
            }
            if (due_current && new Date() > due_current) $('#check-' + cmp.props.taskID).addClass("od");
            else if (due_current && cmp.numDaysBetween(new Date(), due_current) <= 1) $('#check-' + cmp.props.taskID).addClass("ds"); 
            if (defer_current && new Date() < defer_current) $('#' + cmp.props.taskID).css("opacity", "0.3");
            cmp.setState({name: e.name, style: "boo"});
        });
    }

    render() {
        return (
            <IonItem id={this.props.taskID.toString()}>
            <IonCheckbox id={"check-"+this.props.taskID.toString()} onIonChange={(e) => {
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

