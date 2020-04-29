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

import React from 'react';
import { useLocation } from 'react-router-dom';
import { chevronForwardCircle } from 'ionicons/icons';
import './Menu.css';
import '../backend/CacheManager';
import '../backend/PerspectiveManager';
import '../backend/FirebaseManager';
import 'font-awesome/css/font-awesome.min.css';

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList>
              <IonMenuToggle key={0} autoHide={false}>
              <IonItem className={location.pathname === "/page/Page" ? 'selected' : ''} routerLink={"/page/Page"} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" icon={chevronForwardCircle} color="#000000"/>
                  <IonLabel id="menu-upcoming">Upcoming</IonLabel>
                </IonItem>
              </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
