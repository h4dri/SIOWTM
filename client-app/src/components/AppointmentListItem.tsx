import React, { useContext, useState } from 'react';
import '../styles/AppointmentListItem.css';
import { IVisit } from '../models/VisitModel';
import Moment from 'moment';
import 'moment/locale/pl';
import { RootStoreContext } from '../stores/RootStore';
import { Link } from 'react-router-dom';

function AppointmentListItem(props: { item: IVisit, isDoctor: boolean}) {
    const rootStore = useContext(RootStoreContext)
    
    const [isShow, setIsShow] = useState(false);

    const handleShowHideButton = async () => {
        isShow ? setIsShow(false) : setIsShow(true);
        await rootStore.visitsStore.loadOneVisit(props.item.id);
    }

    Moment.locale('pl')

    return (
           <div id="appointmentsItemContainer">
               <Link to={`/visit/${props.item.id}`}>
                    <div id="mainContent" onClick={handleShowHideButton}>
                        <div id="title">{props.item.title}</div>
                        <div id="startDateShort">{Moment(props.item.date).format('DD MMMM yyyy HH:mm')}</div>
                    </div>
               </Link>
           </div>
    );
}

export default AppointmentListItem;