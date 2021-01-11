import React, { useState } from 'react';
import '../styles/AppointmentListItem.css';
import { AppointmentModel } from '../models/AppointmentModel';
import Moment from 'moment';
import 'moment/locale/pl'

function AppointmentListItem(props: { item: AppointmentModel}) {
    const [isShow, setIsShow] = useState(false);

    function handleShowHideButton(){
        isShow ? setIsShow(false) : setIsShow(true);
        console.log(props.item)
    }

    Moment.locale('pl')

    return (
           <div id="appointmentsItemContainer">
               <div id="mainContent" onClick={handleShowHideButton}>
                    <div id="title">{props.item.title}</div>
                    <div id="startDateShort">{Moment(props.item.startDate).format('d MMMMM HH:mm')}</div>
                    <div id="showHideButton">{isShow ? "-" : "+"}</div>
               </div>
               <div id="showableContent" style={{ display: isShow ? "block" : "none"}}>
                    <div id="description"><p>Szczegóły:</p><div id="descriptionContent">{props.item.description}</div></div>
                    <div id="startDateLong">Data:&emsp; {Moment(props.item.startDate).format('d MMMM yyyy HH:mm')}</div>
                    <div id="location">Miejsce:&emsp; {props.item.location}</div>
                    <div id="doctor">Doktor:&emsp; <i>{props.item.doctor}</i></div>
               </div>
           </div>
    );
}

export default AppointmentListItem;