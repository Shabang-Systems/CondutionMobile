import Page from './pages/Page';
import Upcoming from './pages/Upcoming';
import Menu from './components/Menu';
import React, {Component} from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, IonText } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Firebase and the Engine */
let firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

let E = require("./backend/CondutionEngine");
E.start(firebase);


interface AppState {
    authenticatedUser: any,
}

class App extends Component<{}, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {authenticatedUser:null};
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user:any) => this.setState({authenticatedUser:user}));
    }

    render() {
        return (
            <IonApp>
                <IonReactRouter>
                {(()=>{
                    if (this.state.authenticatedUser) {
                        return (
                            <IonSplitPane contentId="main">
                                <Menu engine={E} user={firebase.auth().currentUser.uid} />
                                <IonRouterOutlet id="main">
                                    <Route path="/" component={Upcoming} exact />
                                    <Route path="/perspective/:name" component={Page} exact />
                                    <Route path="/project/:name" component={Page} exact />
                              </IonRouterOutlet>
                            </IonSplitPane>
                        )
                    } else {
                        // TODO: Add auth interface
                        return (<IonText><h1>Sad Trombone Day</h1></IonText>);
                    }
                })()}
                </IonReactRouter>
            </IonApp>
        );
    }
};

export default App;
