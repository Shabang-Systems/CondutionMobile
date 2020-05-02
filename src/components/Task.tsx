import {IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonText, IonCheckbox} from '@ionic/react';

import React, {Component} from 'react';
import { chevronForwardCircle, layers, albums } from 'ionicons/icons';
import './Task.css';
import 'font-awesome/css/font-awesome.min.css';


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
            <IonItem>
                <IonCheckbox></IonCheckbox>
                <IonLabel>{this.state.name}</IonLabel>
            </IonItem>
        );
    };
}

export default Task;

