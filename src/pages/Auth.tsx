import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonIcon, IonLabel, IonList, IonItem } from '@ionic/react';
import { chevronForwardCircle, layers, albums } from 'ionicons/icons';
import React, {Component} from 'react';
import { useParams } from 'react-router';
import './Auth.css';


interface AuthState {
}

interface AuthProps {
    engine: any,
}

class Auth extends Component<AuthProps, AuthState>{

    constructor(props:any) {
        super(props);
    }

    render() {
        return (
            <IonPage>
                <IonContent>
                    <IonText>
                        <h1>Wassup?</h1>
                    </IonText>
                </IonContent>
            </IonPage>
        );
    }
};

export default Auth;
