import React, { useContext, useState } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/DoctorPanel.css';
import HeaderCP from './HeaderCP';

function DoctorPanel(){
    const rootStore = useContext(RootStoreContext);
    
    const [firstName, setFirstName] = useState('Adam');
    const [lastName, setLastName] = useState('Padżet');

    return (
        <>
            <div id="doctorPanel">
                <HeaderCP firstName={firstName} lastName={lastName} isDoctor={true}/>

                <div id="doctorPanelContent">
                    <div className="doctorPanelBlock left">
                        <div className="blockTopic"><h2>Kalendarz wizyt</h2></div>
                    </div>
                    <div className="doctorPanelBlock right top">
                        <div className="blockTopic"><h2>Najbliższa wizyta</h2></div>
                    </div>
                    <div className="doctorPanelBlock right bottom">
                        <div className="blockTopic"><h2>Historia wizyt</h2></div>
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

export default DoctorPanel;