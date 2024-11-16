import React from "react";

const Warning = ({ rightnow, doit }) => {
    // Check if doit is a function
    console.log("doit:", doit);

    if (typeof doit !== 'function') {
        console.error('doit is not a function');
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",  // Semi-transparent background
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    width: 1011,
                    height: 530,
                    background: "white",
                    borderRadius: 89,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        color: "black",
                        fontSize: 64,
                        fontFamily: "Inter",
                        fontWeight: "400",
                    }}
                >
                    Stop Accepting Orders
                </div>
                <div
                    style={{
                        color: "black",
                        fontSize: 36,
                        fontFamily: "Inter",
                        fontWeight: "400",
                        margin: "20px 0",
                    }}
                >
                    Are You Sure?<br />You will not be able to see and accept new orders
                </div>
                <div style={{ display: "flex", gap: 30, marginTop: 20 }}>
                    <button
                        style={{
                            width: 289,
                            height: 103,
                            background: "#31B475",
                            borderRadius: 20,
                            color: "black",
                            fontSize: 64,
                            fontFamily: "Inter",
                            fontWeight: "500",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onClick={doit}  // Trigger doit when "YES" is clicked
                    >
                        YES
                    </button>
                    <button
                        style={{
                            width: 289,
                            height: 103,
                            background: "#D9D9D9",
                            borderRadius: 20,
                            color: "black",
                            fontSize: 64,
                            fontFamily: "Inter",
                            fontWeight: "500",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onClick={rightnow}  // Trigger rightnow when "NO" is clicked
                    >
                        NO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Warning;
