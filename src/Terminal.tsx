import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Function to handle navigation
const Opener = (to: string) => {
    let navigate = useNavigate();
    return () => {
        navigate(to);
    };
};

const Terminal = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false); // State to track dragging
    const [val, setVal] = useState("[denis@ReactOS]~"); // Initial input value
    const [history, setHistory] = useState<string[]>([]); // Command history
    const [response, setResponse] = useState<string | null>(null); // Response to commands

    const gridSize = 1; // Define grid size (e.g., 100px)

    // Handle input change
    const handleChangeInput = (event: any) => {
        setVal(event.target.value);
    };

    // Handle the drag start
    const handleDragStart = (e: any) => {
        const rect = e.target.getBoundingClientRect();
        e.dataTransfer.setData("startX", e.clientX - rect.left);
        e.dataTransfer.setData("startY", e.clientY - rect.top);
    };

    // Handle dropping and snapping to grid
    const handleDrop = (e: any) => {
        const startX = e.dataTransfer.getData("startX");
        const startY = e.dataTransfer.getData("startY");

        // Calculate new position based on where the drop happened
        let x = e.clientX - startX;
        let y = e.clientY - startY;

        // Snap to the nearest grid cell
        x = Math.round(x / gridSize) * gridSize;
        y = Math.round(y / gridSize) * gridSize;

        // Get the footer's position and height
        const footer = document.querySelector("footer");
        const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight;

        // Get the height of the settings div
        const divHeight = e.target.offsetHeight;

        // Prevent the div from being dropped below the footer
        if (y + divHeight > footerTop) {
            y = footerTop - divHeight; // Adjust the y position to stay above the footer
        }

        setPosition({ x, y });
        setDragging(false); // Stop dragging
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            // Add the current input to the history and generate a response
            setHistory((prevHistory) => [...prevHistory, val]);

            let cmdResponse = "";
            const lowerVal = val;

            // Command responses
            if (lowerVal === "[denis@ReactOS]~hello") {
                cmdResponse = "Hello, User!";
            } else if (lowerVal === "[denis@ReactOS]~clear") {
                setHistory([]); // Clear the terminal history
                setResponse("Terminal cleared.");
                setVal("[denis@ReactOS]~");
                return;
            } else {
                cmdResponse = `Command not recognized: ${val}`;
            }

            setResponse(cmdResponse);
            setVal("[denis@ReactOS]~"); // Reset the input field after command
        }
    };

    useEffect(() => {
        // Attach global event listeners for dragover and drop on the window
        const handleDragOver = (e: any) => {
            e.preventDefault(); // Allow dropping
        };

        // Attach listeners
        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("drop", handleDrop);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("drop", handleDrop);
        };
    }, []);

    return (
        <div className="settings-app-div">
            <div
                className="terminal-app"
                draggable
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onDragOver={(e: any) => e.preventDefault()}
                style={{
                    position: "absolute",
                    left: position.x,
                    top: position.y,
                    cursor: dragging ? "grabbing" : "grab",
                }}
            >
                <div className="line">
                    <img src="/icons8-settings-16.png" alt="" className="logo3" />
                    <button className="minimize3">-</button>
                    <button className="square3">
                        <img src="/icons8-square-30.png" alt="" className="square-icon2"/>
                    </button>
                    <button onClick={Opener("/")} className="cross3">
                        X
                    </button>
                </div>
                <div className="terminal-window">
                    <div className="history">
                        {history.map((cmd, index) => (
                            <div key={index} className="command">{cmd}</div>
                        ))}
                        {response && <div className="response">{response}</div>}
                    </div>
                    <input
                        type="text"
                        value={val}
                        onChange={handleChangeInput}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="terminal-input"
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;


























