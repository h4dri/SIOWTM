import React, { useContext, useEffect, useState } from 'react';
import '../styles/CloseVisitStyle.css';
import { RootStoreContext } from '../stores/RootStore';
import { IVisit } from '../models/VisitModel';
import Moment from 'moment';
import 'moment/locale/pl';

function CloseVisitComponent(props: {visit: IVisit | undefined}) {
    const rootStore = useContext(RootStoreContext);

    const [clientName, setClientName] = useState('')

    useEffect(() => {
        if(props.visit != undefined) {
            if(props.visit.attendees[0].isDoctor) {
                setClientName(props.visit.attendees[1].displayName);
            } else {
                setClientName(props.visit.attendees[0].displayName);
            }
        }
    }, [props.visit])

    Moment.locale('pl')

    return (
        <div id="closeVisitContent">
            {
                props.visit === undefined ? (
                    <div id="noVisits">
                        <p>Brak wizyt = Brak najbliższej wizyty</p>
                    </div>
                    
                ) : (
                    <>
                        <div className="closeVisitElement"><p>Tytuł:</p>
                            <div className="elementText">{props.visit?.title}</div>
                        </div>
                        <div className="closeVisitElement"><p>Szczegóły:</p>
                            <div className="elementText">{props.visit?.description}</div>
                        </div>
                        <div className="closeVisitElement"><p>Data:</p>
                            <div className="elementText">{Moment(props.visit?.date).format('DD (dddd) MMMM yyyy HH:mm')}</div>
                        </div>
                        <div className="closeVisitElement"><p>Kategoria:</p>
                            <div className="elementText">{props.visit?.category}</div>
                        </div>
                        <div className="closeVisitElement"><p>Pacjent:</p>
                            <div className="elementText"><i>{clientName}</i></div>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default CloseVisitComponent;