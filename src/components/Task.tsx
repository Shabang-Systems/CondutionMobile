import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonText, IonCheckbox} from '@ionic/react';

import React, {Component} from 'react';
import { chevronForwardCircle, layers, albums } from 'ionicons/icons';
import { Plugins, HapticsImpactStyle, HapticsNotificationType } from '@capacitor/core';
import './Task.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from "jquery";
import moment from "moment-timezone";
import TaskEdit from "../components/TaskEdit";

// TODO for Android: <uses-permission android:name="android.permission.VIBRATE" /> 

const { Haptics } = Plugins;

interface TaskState {
    name: String,
    style: String,
    showModal: boolean,
}

interface TaskProps {
    engine: any,
    userID: String,
    taskID: String,
}

class Task extends Component<TaskProps, TaskState>{
    constructor(props:any) {
        super(props);
        this.state = {name: "", style: "", showModal: false};
    }

    private numDaysBetween(d1: Date, d2: Date) {
        let diff = Math.abs(d1.getTime() - d2.getTime());
        return diff / (1000 * 60 * 60 * 24);
    };


    componentDidMount() {
        let cmp = this;
        this.props.engine.db.getTaskInformation(this.props.userID, this.props.taskID).then(function(e:any) {
            let due;
            let defer;
            if (e.defer) {
                defer = new Date(e.defer.seconds*1000);
            }
            if (e.due) {
                due = new Date(e.due.seconds*1000);
            }
            let defer_current;
            let due_current;
            if(e.isFloating) {
                defer_current = defer ? moment(defer).tz(e.timezone).local(true).toDate() : undefined; 
                due_current = due ? moment(due).tz(e. timezone).local(true).toDate() : undefined;
            } else {
                defer_current = defer;
                due_current = due;
            }
            if (due_current){
                if(new Date() > due_current) $('#check-' + cmp.props.taskID).addClass("od");
                else if(cmp.numDaysBetween(new Date(), due_current) <= 1) $('#check-' + cmp.props.taskID).addClass("ds")
            }; 
            if (defer_current && new Date() < defer_current) $('#container-' + cmp.props.taskID).css("opacity", "0.4");
            cmp.setState({name: e.name, style: "boo"});
        });
    }

    render() {
        return (
        <IonItem class="task-container" id={"container-"+this.props.taskID.toString()}>
        <IonCheckbox id={"check-"+this.props.taskID.toString()} onIonChange={(e) => {
                if(e.detail.checked) {
                    $('#container-'+this.props.taskID).animate({"margin": "5px 0 5px 0 !important"}, 200);
                    $("#container-"+this.props.taskID).slideUp(300);
                    $('#container-'+this.props.taskID).css({"opacity": "0.6", "text-decoration": "line-through"});
                    Haptics.notification({type: HapticsNotificationType.SUCCESS});
            }
        }}></IonCheckbox>

        <IonItem class="task-name" id={this.props.taskID.toString()} button onClick={()=>this.setState({showModal: true})} detail={false}>
              <IonLabel>{this.state.name}</IonLabel>
        </IonItem>
            <TaskEdit engine={this.props.engine} userID={this.props.userID} taskID={this.props.taskID} visibility={this.state.showModal} onHide={()=>this.setState({showModal: false})}></TaskEdit>
        </IonItem>
    );
};
}

export default Task;

