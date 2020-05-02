import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonText, IonCheckbox} from '@ionic/react';

import React, {Component} from 'react';
import { chevronForwardCircle, layers, albums } from 'ionicons/icons';
import './Task.css';
import 'font-awesome/css/font-awesome.min.css';


interface TaskState {
}

interface TaskProps {
    engine: any,
    userID: String,
    taskID: String,
}

class Task extends Component<TaskProps, TaskState>{
    constructor(props:any) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <IonItem>
                <IonLabel>Dudud</IonLabel>
            </IonItem>
        );
    };
}

export default Task;

