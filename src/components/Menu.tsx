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
import { chevronForwardCircle, layers } from 'ionicons/icons';
import './Menu.css';
import '../backend/CacheManager';
import '../backend/PerspectiveManager';
import {getTopLevelProjects, getPerspectives} from '../backend/FirebaseManager';
import 'font-awesome/css/font-awesome.min.css';

interface MenuState {
    perspectives: any,
    projects: any
}

class Menu extends Component<{} & RouteComponentProps<{}>, MenuState>{
    constructor(props:any) {
        super(props);
        this.state = {perspectives:[], projects:[]};
    }

    componentDidMount() {
        let ps : String[] = [];
        let comp = this;
        (getPerspectives("TcZUcte5MFOx410Q8WJ6mRW1Pco1").then(function(e:any) {
            ps = (e[2].map((p:any)=>p.name));
            comp.setState({perspectives: ps});
        }));
        (getTopLevelProjects("TcZUcte5MFOx410Q8WJ6mRW1Pco1").then(function(e:any) {
            ps = (e[2].map((p:any)=>p.name));
            comp.setState({projects: ps});
        }));
    }

    render() {
        const { location } = this.props;
        return (
        <IonMenu contentId="main" type="overlay">
          <IonContent>
            <IonList>
                  <IonMenuToggle id="upcoming-toggle" key={0} autoHide={false}>
                      <IonItem className={location.pathname === "/" ? 'selected menu-upcoming' : 'menu-upcoming'} routerLink={"/"} routerDirection="none" lines="none" detail={false}>
                          <IonIcon class="menu-icon" slot="start" icon={chevronForwardCircle}/>
                          <IonLabel class="menu-text">Upcoming</IonLabel>
                        </IonItem>
                  </IonMenuToggle>
                  <IonLabel class="menu-label">Perspectives</IonLabel>
                  {this.state.perspectives.map((pName:String)=>{
                    return (
                        <IonItem className={location.pathname === "/page/perspective" ? 'selected menu-item' : 'menu-item'} routerLink={"/page/Perspsective"} routerDirection="none" lines="none" detail={false}>
                            <IonIcon slot="start" icon={layers}></IonIcon>
                            <IonLabel class="menu-text">{pName}</IonLabel>
                        </IonItem>
                    );
                  })} 
                  <br />
                  <IonLabel class="menu-label">Projects</IonLabel>
                  {this.state.projects.map((pName:String)=>{
                    return (
                        <IonItem className={location.pathname === "/page/project" ? 'selected menu-item' : 'menu-item'} routerLink={"/page/perspsective"} routerDirection="none" lines="none" detail={false}>
                            <IonIcon slot="start" icon={layers}></IonIcon>
                            <IonLabel class="menu-text">{pName}</IonLabel>
                        </IonItem>
                    );
                  })} 
            </IonList>
          </IonContent>
        </IonMenu>);
    };
}

export default withRouter(Menu);

