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
import { chevronForwardCircle, layers, shareSocial } from 'ionicons/icons';
import './Menu.css';
import 'font-awesome/css/font-awesome.min.css';


interface MenuState {
    perspectives: any,
    projects: any
}

interface MenuProps {
    user: String,
    engine: any,
}

class Menu extends Component<MenuProps & RouteComponentProps<{}>, MenuState>{
    constructor(props:any) {
        super(props);
        this.state = {perspectives:[], projects:[]};
    }

    componentDidMount() {
        let comp = this;
        (this.props.engine.db.getPerspectives(this.props.user).then(function(e:any) {
            comp.setState({perspectives: e[2]});
        }));
        (this.props.engine.db.getTopLevelProjects(this.props.user).then(function(e:any) {
            comp.setState({projects: e[2]});
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
                  {this.state.perspectives.map((p:any)=>{
                    return (
                      <IonMenuToggle class="perspective-toggle" key={p.id} autoHide={false}>
                        <IonItem className={location.pathname === "/perspective/"+p.id ? 'selected menu-item menu-perspective' : 'menu-item menu-perspective'} routerLink={"/perspective/"+p.id} routerDirection="none" lines="none" detail={false}>
                            <IonIcon slot="start" icon={layers}></IonIcon>
                            <IonLabel class="menu-text">{p.name}</IonLabel>
                        </IonItem>
                      </IonMenuToggle>
                    );
                  })} 
                  <br />
                  <IonLabel class="menu-label">Projects</IonLabel>
                  {this.state.projects.map((p:any)=>{
                    return (
                      <IonMenuToggle class="perspective-toggle" key={p.id} autoHide={false}>
                        <IonItem className={location.pathname === "/project/"+p.id ? 'selected menu-item menu-project' : 'menu-item menu-project'} routerLink={"/project/"+p.id} routerDirection="none" lines="none" detail={false}>
                            <IonIcon slot="start" icon={shareSocial}></IonIcon>
                            <IonLabel class="menu-text">{p.name}</IonLabel>
                        </IonItem>
                      </IonMenuToggle>
                    );
                  })} 
            </IonList>
          </IonContent>
        </IonMenu>);
    };
}

export default withRouter(Menu);

