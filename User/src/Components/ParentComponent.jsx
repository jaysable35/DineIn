import React, { useState } from "react";
import Kart from "./orders";  // Assuming Kart component is correctly set up
import Warning from "./warning";  // Assuming Warning component is correctly set up

const ParentComponent = () => {
    const [disableOrder, setDisableOrder] = useState(false);  // State to disable orders
    const [showWarning, setShowWarning] = useState(false);    // To control visibility of warning modal

    const handleDisableOrder = () => {
        console.log("Disabling orders..."); 
        setDisableOrder(true);  // Disable orders
        setShowWarning(false);  // Close the warning modal after confirming
    };

    const handleCloseModal = () => {
        setShowWarning(false);  // Close the warning modal
    };

    return (
        <div>
            {/* Conditionally render Warning modal when showWarning is true */}
            {showWarning && (
                <Warning rightnow={handleCloseModal} doit={handleDisableOrder} />
            )}

            {/* Pass disableOrder state to Kart */}
            <Kart
                disableOrder={disableOrder}
                setDisableOrder={setDisableOrder}
            />
        </div>
    );
};

export default ParentComponent;
