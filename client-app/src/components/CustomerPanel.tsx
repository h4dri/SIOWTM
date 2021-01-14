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
import SubscriptionComponent from './SubscriptionComponent';

const CustomerPanel = () => {
    const rootStore = useContext(RootStoreContext)

    const [firstName] = useState('Adam');
    const [lastName] = useState('Padżet');
    const [appointmentsList, setAppointmentsList] = useState<Array<IVisit>>(rootStore.visitsStore.visits);
    const [closedVisitsList, setClosedVisitsList] = useState<Array<IVisit>>(rootStore.visitsStore.endedVisits);
    const [isLoading, setIsLoading] = useState(true);
    const [actualPage, setActualPage] = useState(0);
    const [actualPageTwo, setActualPageTwo] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [numberOfPagesTwo, setNumberOfPagesTwo] = useState(0);
    const [numberOfElementsAtOnePage, setNumberOfElementsAtOnePage] = useState(0);
    const [numberOfElementsAtOnePageTwo, setNumberOfElementsAtOnePageTwo] = useState(0);
    const [elementHeight, setElementHeight] = useState(0);
    const [elementHeightTwo, setElementHeightTwo] = useState(0);
 
    useEffect(() => {
        rootStore.visitsStore.loadVisits()
            .then(() => {
                setIsLoading(false)
                setAppointmentsList(rootStore.visitsStore.visits)
                setClosedVisitsList(rootStore.visitsStore.endedVisits)
                const d = document.getElementById('appointmentsList')!
                const dd = document.getElementById('closedVisitsList')!
                const h = d.clientHeight - 83
                const hh = dd.clientHeight - 83
                const noeaop = Number(Math.floor(h / 51))
                const noeaopp = Number(Math.floor(hh / 51))
                const nop = Number(Math.ceil(rootStore.visitsStore.visits.length / noeaop))
                const nopp = Number(Math.ceil(rootStore.visitsStore.endedVisits.length / noeaopp))
                setElementHeight(h)
                setElementHeightTwo(hh)
                setNumberOfElementsAtOnePage(noeaop)
                setNumberOfElementsAtOnePageTwo(noeaopp)
                setNumberOfPages(nop)
                setNumberOfPagesTwo(nopp)
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
                        <SubscriptionComponent />
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
                    <div id="closedVisitsList" className="customerPanelBlock right bottom">
                        <div className="blockTopic"><h2>Historia leczenia</h2></div>
                        <div id="listContainer">
                            {isLoading ? (
                                <p>Ładowanie...</p>
                            ) : (
                                closedVisitsList.length === 0 ? (
                                    <div id="noVisits">
                                        <p>Brak wizyt</p>
                                    </div>
                                ) : (
                                    <>
                                    <ul style={{ height: elementHeightTwo }}>
                                    {closedVisitsList.map((item, index) => {
                                        if ((numberOfElementsAtOnePageTwo * (actualPageTwo + 1) - numberOfElementsAtOnePageTwo - 1 ) < index && 
                                        index < (numberOfElementsAtOnePageTwo * (actualPageTwo + 1 ))) {
                                            return <li key={item.id}><AppointmentListItem item={item} isDoctor={false}/></li>
                                        } else return null
                                    })}
                                    </ul>
                                    <div id="pageCounter">
                                        <div className="pgElement" onClick={() => actualPageTwo === 0 ? console.log("-") : setActualPageTwo(actualPageTwo - 1)}>-</div>
                                        <div className="pgElement">{actualPageTwo + 1}</div>
                                        <div className="pgElement" onClick={() => actualPageTwo === (numberOfPagesTwo - 1) ? console.log("+") : setActualPageTwo(actualPageTwo + 1)}>+</div>
                                    </div>
                                </>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default observer(CustomerPanel);