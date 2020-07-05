import {IonHeader, IonToolbar, IonButtons, IonButton, IonModal, IonContent, IonInput, IonText, IonLabel, IonItem, IonDatetime, IonTextarea, IonList, IonIcon, IonToggle } from '@ionic/react';
import React, {Component} from 'react';
import Select from 'react-select';
import { playCircle, stopCircle } from 'ionicons/icons';
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

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

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
                <IonContent id="editView">
                  <IonList>
                      <IonItem>
                        <IonLabel position="stacked">Name</IonLabel>
                        <IonInput type="text" placeholder="Koolio" value={this.state.taskInfo.name}></IonInput>
                      </IonItem>

                      <IonItem>
                        <IonLabel position="stacked">Description</IonLabel>
                        <IonTextarea placeholder="Add a cool description?" value={this.state.taskInfo.description}></IonTextarea>
                      </IonItem>
                      
                  </IonList>
                  <div className="tagbox">
                      <IonLabel><IonIcon icon={playCircle}></IonIcon></IonLabel>
                      <Select id="project" className="selectBox" isSearchable={true} isClearable={true} options={options} />
                  </div>


                  <IonList>
                      <IonItem>
                          <IonLabel><IonIcon icon={playCircle}></IonIcon></IonLabel>
                          <IonDatetime displayFormat="MMM D YY h:m:s A" pickerFormat="MMM DD, YYYY h:m:s A" placeholder="Defer" value={this.state.taskInfo.defer} onIonChange={()=>{}}></IonDatetime>
                      </IonItem>
                      <IonItem>
                          <IonLabel><IonIcon icon={stopCircle}></IonIcon></IonLabel>
                          <IonDatetime displayFormat="MMM D YY h:m:s A" pickerFormat="MMM DD, YYYY h:m:s A" placeholder="Due" value={this.state.taskInfo.due} onIonChange={()=>{}}></IonDatetime>
                      </IonItem>
                  </IonList>
                  <IonList>
                      <IonItem>
                        <IonLabel>Flagged</IonLabel>
                        <IonToggle color="tertiary" />
                      </IonItem>
                      <IonItem>
                        <IonLabel>Floating</IonLabel>
                        <IonToggle color="secondary" />
                      </IonItem>
                  </IonList>
                </IonContent>
            </IonModal>
      );
};
}

export default TaskEdit;

