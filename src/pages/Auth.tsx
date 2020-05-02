import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonIcon, IonLabel, IonList, IonItem, IonInput, IonItemDivider, IonButton } from '@ionic/react';
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
                <div id="auth-image"></div>
                <IonContent id="auth-content-area">
                    <div id="center-wrapper">
                        <div id="centered">
                            <IonText><h1 id="greeting-auth">What's up?</h1><IonText><b>Welcome to Condution.</b></IonText></IonText>
                            <IonList id="auth-items">
                                <IonItem>
                                    <IonInput placeholder="Email" type="email"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput placeholder="Password" type="password"></IonInput>
                                </IonItem>
                            </IonList>
                            <div id="auth-actions">
                                <IonButton id="signup" size="small" color="primary" fill="outline">Signup</IonButton>
                                <IonButton id="login" size="small" color="secondary">Login</IonButton>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        );
    }
};

export default Auth;
