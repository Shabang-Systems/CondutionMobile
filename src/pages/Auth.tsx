import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonText, IonIcon, IonLabel, IonList, IonItem, IonInput, IonItemDivider, IonButton } from '@ionic/react';
import { chevronForwardCircle, layers, albums } from 'ionicons/icons';
import React, {Component} from 'react';
import { useParams } from 'react-router';
import './Auth.css';


interface AuthState {
    email: any,
    password: any,
    name: any,
}

interface AuthProps {
    engine: any,
    authObj: any,
}

class Auth extends Component<AuthProps, AuthState>{

    constructor(props:any) {
        super(props);
        this.state = {email: "", password: "", name: ""};
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
                                    <IonInput placeholder="Email" type="email" onIonChange={(e)=>this.setState({email: e.detail.value})} value={this.state.email}></IonInput>
                                </IonItem>
                                <IonItem>
                                <IonInput placeholder="Password" type="password" onIonChange={(e)=>this.setState({password: e.detail.value})} value={this.state.password}></IonInput>
                                </IonItem>
                            </IonList>
                            <div id="auth-actions">
                                <IonButton id="signup" size="small" color="primary" fill="outline">Signup</IonButton>
                                <IonButton id="login" size="small" color="secondary" onClick={()=>{
                                    // Login
                                    console.log(this.state.email);
                                    this.props.authObj.signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error:any) {
                                        console.error(error);
                                    });
                                }}>Login</IonButton>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        );
    }
};

export default Auth;
