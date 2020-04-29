import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React, {Component} from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { chevronForwardCircle } from 'ionicons/icons';
import './Menu.css';
import '../backend/CacheManager';
import '../backend/PerspectiveManager';
import {getTopLevelProjects, getPerspectives} from '../backend/FirebaseManager';
import 'font-awesome/css/font-awesome.min.css';

let ps : String[] = [];
(getPerspectives("TcZUcte5MFOx410Q8WJ6mRW1Pco1").then((e:any)=>{
    ps.push(e[2].map((p:any)=>p.name));
}));

class Menu extends Component<{} & RouteComponentProps<{}>, {}>{
    constructor(props:any) {
        super(props);
    }

    render() {
        const { location } = this.props;
        return (<IonMenu contentId="main" type="overlay">
          <IonContent>
            <IonList>
                  <IonMenuToggle key={0} autoHide={false}>
                      <IonItem className={location.pathname === "/" ? 'selected' : ''} routerLink={"/page/Page"} routerDirection="none" lines="none" detail={false}>
                          <IonIcon slot="start" icon={chevronForwardCircle} color="#000000"/>
                          <IonLabel id="menu-upcoming">Upcoming</IonLabel>
                        </IonItem>
                  </IonMenuToggle>
                  <IonLabel class="menu-label">Perspectives</IonLabel>
                  {ps.map((pName:String)=>{
                    return (
                        <IonItem className={location.pathname === "/page/Perspective" ? 'selected' : ''} routerLink={"/page/Perspsective"} routerDirection="none" lines="none" detail={false}>
                            <IonIcon slot="start" icon={chevronForwardCircle} color="#000000"/>
                            <IonLabel id="menu-upcoming">{pName}</IonLabel>
                        </IonItem>

                    );
                  })} 
            </IonList>
          </IonContent>
        </IonMenu>);
    };
}

export default withRouter(Menu);

