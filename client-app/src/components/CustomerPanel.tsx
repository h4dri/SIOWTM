import React, { useState, useEffect, useContext } from 'react';
import '../styles/CustomerPanel.css';
import HeaderCP from './HeaderCP';
import AppointmentListItem from './AppointmentListItem';
import { AppointmentModel } from '../models/AppointmentModel';
import agent from '../api/agent';
import { IVisit } from '../models/VisitModel';
import { RootStoreContext } from '../stores/RootStore';

function CustomerPanel() {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn, user} = rootStore.userStore;

    const [firstName, setFirstName] = useState('Adam');
    const [lastName, setLastName] = useState('Padżet');
    const [appointmentsList, setAppointmentsList] = useState<Array<AppointmentModel>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actualPage, setActualPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [numberOfElementsAtOnePage, setNumberOfElementsAtOnePage] = useState(0);
    const [height, setHeight] = useState(useAppointmentsListDivHeight());

    useEffect(() => {
        setIsLoading(true)
        agent.Visits.list()
            .then(response =>
                {
                    let visits: IVisit[] = [];
                    response.forEach(visit => {
                        visits.push(visit)
                    })
                })
        // fetch(
        //     apiAddress + appointmentsApi,
        // )
        //     .then(res => res.json())
        //     .then(response => {
        //         setAppointmentsList(response)
        //         appointmentsList.forEach(element => {
        //             element.isShow = false
        //         });
        //         setIsLoading(false)
        //         const d = document.getElementById('appointmentsList')!
        //         const h = d.clientHeight - 53
        //         setHeight(h)
        //         setNumberOfElementsAtOnePage(Number(Math.floor(h / 51)))
        //         setNumberOfPages(Number(Math.ceil(appointmentsList.length / numberOfElementsAtOnePage)))
        //     })
        //     .catch(error => console.log(error));
    }, []);

    function useAppointmentsListDivHeight() {
        const [h, setH] = useState(0);
        const d = document.getElementById('appointmentsList')!
        useEffect(() => {
            const handleResize = () => {
                setH(d.clientHeight - 53)
                setNumberOfElementsAtOnePage(Number(Math.floor(h / 51)))
                setNumberOfPages(Number(Math.ceil(appointmentsList.length / numberOfElementsAtOnePage)))
            }
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            };
        });
        return h;
    }
    
    return (
        <>
            <div id="customerPanel">
                <HeaderCP firstName={user?.username} lastName={lastName} isDoctor={false} />

                <div id="customerPanelContent">
                    <div className="customerPanelBlock left top">
                        <div className="blockTopic"><h2>Subskrypcja</h2></div>
                    </div>
                    <div className="customerPanelBlock right top">
                        <div className="blockTopic"><h2>Wizyta</h2></div>
                    </div>
                    <div id="appointmentsList" className="customerPanelBlock left bottom">
                        <div className="blockTopic"><h2>Lista wizyt</h2></div>
                        {isLoading ? (
                            <div id="loadingText"><p>Loading....</p></div>
                        ) : (
                                <div id="listContainer">
                                    <ul>
                                        {appointmentsList.map((item, index) => {
                                            if (index < numberOfElementsAtOnePage) {
                                                console.log("Id: " + index)
                                                return <li key={item.id}><AppointmentListItem item={item} /></li>
                                            } else return null
                                        })}
                                    </ul>
                                </div>
                            )}
                    </div>
                    <div className="customerPanelBlock right bottom">
                        <div className="blockTopic"><h2>Historia leczenia</h2></div>
                    </div>
                </div>
                <div id="circle">
                    <div id="lineOne"></div>
                    <div id="lineTwo"></div>
                    <div id="square"></div>
                </div>
            </div>
        </>
    );
}

export default CustomerPanel;