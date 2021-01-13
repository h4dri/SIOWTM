import React, { useState, useEffect, useContext, useRef } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/SubscriptionStyle.css';

const SubscriptionComponent = () => {
    const rootStore = useContext(RootStoreContext)

    const [isSubscribe, setIsSubsribe] = useState(rootStore.userStore.user?.subscribe);
    const [startDate, setStartDate] = useState(rootStore.userStore.user?.startDate);
    const [endDate, setEndDate] = useState(rootStore.userStore.user?.endDate);

    return(
        <div id="subscriptionContent">
            <div id="subscriptionData">
            {
                isSubscribe ? (
                    <>
                        <div className="subText"><i>Subskrypcja roczna aktywowana</i></div>
                        <div className="subText"><i>Data rozpoczęcia subskrypcji: {startDate}</i></div>
                        <div className="subText"><i>Data zakończenia subskrypcji: {endDate}</i></div>
                    </>
                ) : (
                    <>
                        <div className="subText"><i>Brak Subskrypcji, aktywuj (cena: 100zł)</i></div>
                        <div id="smart-button-container">
                            <div style={{ textAlign: "center" }}>
                                <div id="paypal-button-container"></div>
                            </div>
                        </div>
                    </>
                )
            }
            </div>
        </div>
    );
}

export default SubscriptionComponent;