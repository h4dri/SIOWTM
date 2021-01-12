import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { IVisit } from '../models/VisitModel';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/DoctorPanel.css';
import AppointmentListItem from './AppointmentListItem';
import CloseVisitComponent from './CloseVisitComponent';
import HeaderCP from './HeaderCP';
import 'react-toastify/dist/ReactToastify.css';

function DoctorPanel(){
    const rootStore = useContext(RootStoreContext);
    
    const [firstName, setFirstName] = useState('Adam');
    const [lastName, setLastName] = useState('Padżet');
    const [appointmentsList, setAppointmentsList] = useState<Array<IVisit>>(rootStore.visitsStore.visits);
    const [closeVisit, setCloseVisit] = useState(rootStore.visitsStore.closeVisit);
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
                setCloseVisit(rootStore.visitsStore.closeVisit)
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
            <div id="doctorPanel">
                <ToastContainer />
                <HeaderCP firstName={firstName} lastName={lastName} isDoctor={true}/>

                <div id="doctorPanelContent">
                    <div id="appointmentsList" className="doctorPanelBlock left">
                        <div className="blockTopic"><h2>Kalendarz wizyt</h2></div>
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
                                            return <li key={item.id}><AppointmentListItem item={item} isDoctor={true}/></li>
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
                    <div className="doctorPanelBlock right top">
                        <div className="blockTopic"><h2>Najbliższa wizyta</h2></div>
                        <CloseVisitComponent visit={closeVisit} />
                    </div>
                    <div id="closedVisitsList" className="doctorPanelBlock right bottom">
                        <div className="blockTopic"><h2>Historia wizyt</h2></div>
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
                                            return <li key={item.id}><AppointmentListItem item={item} isDoctor={true}/></li>
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

export default DoctorPanel;