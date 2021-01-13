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
            {
                isSubscribe ? (
                    <div id="subscriptionData">
                        <h1>Subskrypcja roczna aktywowana</h1>
                        <h2>Data rozpoczęcia subskrypcji: {startDate}</h2>
                        <h2>Data zakończenia subskrypcji: {endDate}</h2>
                    </div>
                ) : (
                    <div id="smart-button-container">
                        <div style={{ textAlign: "center" }}>
                            <div id="paypal-button-container"></div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default SubscriptionComponent;