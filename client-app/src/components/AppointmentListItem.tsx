import React, { useContext, useState } from 'react';
import '../styles/AppointmentListItem.css';
import { IVisit } from '../models/VisitModel';
import Moment from 'moment';
import 'moment/locale/pl'
import { RootStoreContext } from '../stores/RootStore';

function AppointmentListItem(props: { item: IVisit}) {
    const rootStore = useContext(RootStoreContext)

    const [isShow, setIsShow] = useState(false);

    function handleShowHideButton(){
        isShow ? setIsShow(false) : setIsShow(true);
    }

    function handleDeleteButton(){
        rootStore.visitsStore.deleteVisit(props.item.id)
            .then(() => {
                console.log("DELETE!")
                console.log(props.item.id)
                window.open("/customerPanel", "_self")
            })
    }

    Moment.locale('pl')

    return (
           <div id="appointmentsItemContainer">
               <div id="mainContent" onClick={handleShowHideButton}>
                    <div id="title">{props.item.title}</div>
                    <div id="startDateShort">{Moment(props.item.date).format('d MMMM HH:mm')}</div>
                    <div id="showHideButton">{isShow ? "-" : "+"}</div>
               </div>
               <div id="showableContent" style={{ display: isShow ? "block" : "none"}}>
                    <div className="showableContentArea"><p>Szczegóły:</p><div id="descriptionContent">{props.item.description}</div></div>
                    <div className="showableContentArea">Data:<br />&emsp;{Moment(props.item.date).format('d MMMM yyyy HH:mm')}</div>
                    <div className="showableContentArea">Kategoria:<br />&emsp;{props.item.category}</div>
                    {/* <div className="showableContentArea">Doktor:<br />&emsp;<i>{props.item.doctorId}</i></div> */}
                    <div id="deleteButton">
                        <input type="submit" value="Usuń wizytę" onClick={handleDeleteButton}/>
                    </div>
               </div>
           </div>
    );
}

export default AppointmentListItem;