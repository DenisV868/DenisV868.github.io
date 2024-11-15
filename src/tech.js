import React, { useRef, useState } from "react";

let objectCheckbox = {
    unchecked: false,
    checked: true,
    stateArray: [],
    highlightArray: [],
    liArray:[]
};

const renderTasks = (list) => {
    console.log("Task list state:", list);
};

const List = ({ inputRef, dateInputRef }) => {
    const [element, setElement] = useState([]);
    const [checkedState, setCheckedState] = useState([]); // State to track the checked status of each checkbox
    const [highlightedState, setHighlightedState] = useState([]);

    // Create refs for checkboxes as an empty array initially
    const checkboxes = useRef([]);

    const input = inputRef;
    const dateInput = dateInputRef;

    // Ensure we initialize empty refs for each checkbox in the list
    const initializeRefs = (length) => {
        // If checkboxes.current has fewer refs than needed, push new empty refs
        while (checkboxes.current.length < length) {
            checkboxes.current.push(React.createRef());
        }
    };

    function add() {
        if (inputRef.current) {
            input.current.focus();
        }

        let inputValue = inputRef.current?.value.trim();

        if (dateInputRef.current) {
            dateInput.current.focus();
        }

        let dateInputValue = dateInputRef.current?.value.trim();

        if (inputValue !== "" && dateInputValue !== "") {
            let combined = inputValue + " " + dateInputValue;
            // Append the new item and initialize the ref for the new checkbox
            setElement((prevState) => [...prevState, combined]);
            setCheckedState((prevState) => [...prevState, false]); // Initialize with unchecked state

            objectCheckbox.stateArray.push(0); // Initialize checkbox state
            objectCheckbox.highlightArray.push("white")
            objectCheckbox.liArray.push(combined)

            // Ensure refs are created for new checkboxes
            initializeRefs(objectCheckbox.stateArray.length);
            initializeRefs(objectCheckbox.liArray)
        }

        if (input.current) {
            input.current.value = "";
        }

        if (dateInput.current) {
            dateInput.current.value = "";
        }

        renderTasks(JSON.stringify(objectCheckbox, null, 2));
    }

    function remove(index) {
        if (inputRef.current && element.length > 0) {
            // Remove the current element and update the checkbox states
            setElement(element.filter((_, i) => i !== index));
            setCheckedState(checkedState.filter((_, i) => i !== index));

            // Update the state array and checkboxes refs
            objectCheckbox.stateArray.splice(index, 1);
            if(objectCheckbox.highlightArray.length > 1) {
                objectCheckbox.highlightArray.splice(index, 1)
            }
            if (objectCheckbox.highlightArray.length === 1) {
                objectCheckbox.highlightArray.splice(index,1,"white")
            }
            checkboxes.current.splice(index, 1);
            objectCheckbox.liArray.splice(index, 1);

            renderTasks(JSON.stringify(objectCheckbox, null, 2));
        } else {
            alert("There are no elements in the list");
        }
    }

    const handleClickCheck = (index) => {
        // Toggle the checked state for the checkbox at the current index
        const updatedCheckedState = checkedState.map((item, i) =>
            i === index ? !item : item
        );

        const updatedHighlightedState = highlightedState.map((item, i) => i===index ?
            "white":"#28a745");

        setCheckedState(updatedCheckedState); // Update the checked state in React state
        setHighlightedState(updatedHighlightedState)

        // Update the checkbox state array
        objectCheckbox.stateArray[index] = updatedCheckedState[index] ? 1 : 0;
        if (objectCheckbox.stateArray[index] === 0){
            objectCheckbox.highlightArray.splice(index,1,"white")
        }
        if (objectCheckbox.stateArray[index] === 1){
            objectCheckbox.highlightArray.splice(index,1,"#28a745")
        }

        renderTasks(objectCheckbox.stateArray); // Update the state of the checkboxes
    };



    return (
        <div className={"containerForList"}>
            <button onClick={add} id={"add"} style={{borderRadius: "100%", width:"40px", textAlign: "center"}}>Add List
                +
            </button>
            <ul>
                The list
                {element.map((item, index) => (
                    <li key={index} style={{backgroundColor:objectCheckbox.highlightArray[index]}}>
                        {item}
                        {/* Controlled checkbox */}
                        <input
                            type="checkbox"
                            id={`checkbox-${index}`}
                            ref={checkboxes.current[index]} // Assign the ref for each checkbox
                            checked={checkedState[index]} // Controlled by the checkedState
                            onChange={() => handleClickCheck(index)} // Handle change by updating the state
                        />
                        <button
                            onClick={() => remove(index)}
                            className={
                                "text-white bg-red-500 hover:bg-red-600 rounded-full p-2 focus:outline-none"
                            }
                            id={"rem"}
                        >
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
