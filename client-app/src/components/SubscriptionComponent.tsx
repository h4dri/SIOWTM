import React, { useState, useEffect, useContext, useRef } from 'react';
import { RootStoreContext } from '../stores/RootStore';
import '../styles/SubscriptionStyle.css';

const SubscriptionComponent = () => {
    const rootStore = useContext(RootStoreContext)

    return(
        <div id="subscriptionContent">
            <div id="smart-button-container">
            <div style={{ textAlign: "center" }}>
                <div id="paypal-button-container"></div>
            </div>
            </div>
        </div>
    );
}

export default SubscriptionComponent;