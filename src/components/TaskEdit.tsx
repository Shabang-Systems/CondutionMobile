import {IonHeader, IonToolbar, IonButtons, IonButton, IonModal, IonContent, IonInput } from '@ionic/react';

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

    /*shouldComponentUpdate(nextProps:TaskEditProps, nextState:TaskEditState) {*/
        //if (this.props === nextProps)  {
            //return false;
        //} else {
            //return true;
        //}
    /*}*/

    componentDidMount() {
        if (this.props.taskID) {
            console.log(this.props.taskID);
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
            <IonModal isOpen={this.props.visibility}>
                <IonHeader translucent={true}>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton onClick={() => this.props.onHide()}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                     <IonInput value={this.state.taskInfo.name} placeholder="Enter Input" onIonChange={e => (this.modify("name", e.detail.value!))}></IonInput>
                </IonContent>
            </IonModal>
      );
};
}

export default TaskEdit;

