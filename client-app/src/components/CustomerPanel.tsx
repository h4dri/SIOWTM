import React, { useState, useEffect, useContext } from 'react';
import '../styles/CustomerPanel.css';
import HeaderCP from './HeaderCP';
import CreateVisitComponent from './CreateVisitComponent';
import AppointmentListItem from './AppointmentListItem';
import { IVisit } from '../models/VisitModel';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerPanel = () => {
    const rootStore = useContext(RootStoreContext)

    const [firstName, setFirstName] = useState('Adam');
    const [lastName, setLastName] = useState('Padżet');
    const [appointmentsList, setAppointmentsList] = useState<Array<IVisit>>(rootStore.visitsStore.visits);
    const [isLoading, setIsLoading] = useState(true);
    const [actualPage, setActualPage] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [numberOfElementsAtOnePage, setNumberOfElementsAtOnePage] = useState(0);
    const [elementHeight, setElementHeight] = useState(0);

    useEffect(() => {
        rootStore.visitsStore.loadVisits()
            .then(() => {
                setIsLoading(false)
                setAppointmentsList(rootStore.visitsStore.visits)
                const d = document.getElementById('appointmentsList')!
                const h = d.clientHeight - 83
                const noeaop = Number(Math.floor(h / 51))
                const nop = Number(Math.ceil(rootStore.visitsStore.visits.length / noeaop))
                setElementHeight(h)
                setNumberOfElementsAtOnePage(noeaop)
                setNumberOfPages(nop)
            });
    }, [rootStore.visitsStore]);
    
    return (
        <>
            <div id="customerPanel">
                <ToastContainer />
                <HeaderCP firstName={firstName} lastName={lastName} isDoctor={false} />

                <div id="customerPanelContent">
                    <div className="customerPanelBlock left top">
                        <div className="blockTopic"><h2>Subskrypcja</h2></div>
                    </div>
                    <div className="customerPanelBlock right top">
                        <div className="blockTopic"><h2>Umów wizytę</h2></div>
                        <CreateVisitComponent />
                    </div>
                    <div id="appointmentsList" className="customerPanelBlock left bottom">
                        <div className="blockTopic"><h2>Lista wizyt</h2></div>
                        <div id="listContainer">
                            {isLoading ? (
                                <p>Ładowanie...</p>
                            ) : (
                                appointmentsList.length === 0 ? (
                                    <div id="noVisits">
                                        <p>Brak wizyt</p>
                                    </div>
                                ) : (
                                <>
                                    <ul style={{ height: elementHeight }}>
                                    {appointmentsList.map((item, index) => {
                                        if ((numberOfElementsAtOnePage * (actualPage + 1) - numberOfElementsAtOnePage - 1 ) < index && 
                                        index < (numberOfElementsAtOnePage * (actualPage + 1 ))) {
                                            return <li key={item.id}><AppointmentListItem item={item} isDoctor={false}/></li>
                                        } else return null
                                    })}
                                    </ul>
                                    <div id="pageCounter">
                                        <div className="pgElement" onClick={() => actualPage === 0 ? console.log("-") : setActualPage(actualPage - 1)}>-</div>
                                        <div className="pgElement">{actualPage + 1}</div>
                                        <div className="pgElement" onClick={() => actualPage === (numberOfPages - 1) ? console.log("+") : setActualPage(actualPage + 1)}>+</div>
                                    </div>
                                </>
                                )
                            )}
                        </div>
                    </div>
                    <div className="customerPanelBlock right bottom">
                        <div className="blockTopic"><h2>Historia leczenia</h2></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default observer(CustomerPanel);