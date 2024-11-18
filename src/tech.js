import React, {useEffect, useRef, useState} from "react"

let objectList = {
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
    let [element, setElement] = useState([]);
    const [checkedState, setCheckedState] = useState([]); // State to track the checked status of each checkbox
    const [highlightedState, setHighlightedState] = useState([]);
    // Create refs for checkboxes as an empty array initially
    const checkboxes = useRef([]);

    const input = inputRef;
    const dateInput = dateInputRef;

    useEffect(() => {
        const savedObjectList = localStorage.getItem("objectList");
        if (savedObjectList) {
            const parsedObjectList = JSON.parse(savedObjectList);
            objectList = parsedObjectList; // Update objectList

            setElement(parsedObjectList.liArray);
            setCheckedState(parsedObjectList.stateArray.map(item => item === 1)); // Convert 1/0 to true/false
            setHighlightedState(parsedObjectList.highlightArray);

            // Ensure refs are created for the checkboxes
            initializeRefs(parsedObjectList.liArray.length);
        }
    }, []);

    const saveToLocalStorage = () => {
        localStorage.setItem("objectList", JSON.stringify(objectList));
    };

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
            //Append the new item and initialize the ref for the new checkbox

            //setElement((prevState)=>[...prevState,combined])

            objectList.stateArray.push(0); // Initialize checkbox state
            objectList.highlightArray.push("white")
            objectList.liArray.push(combined)
            setElement(objectList.liArray.map((item) => (item)));
            setCheckedState(objectList.stateArray); // Initialize with unchecked state

            // Ensure refs are created for new checkboxes
            initializeRefs(objectList.stateArray.length);
            initializeRefs(objectList.liArray)

            saveToLocalStorage()
        }

        if (input.current) {
            input.current.value = "";
        }

        if (dateInput.current) {
            dateInput.current.value = "";
        }

        renderTasks(JSON.stringify(objectList, null, 2));
    }

    function remove(index) {
        if (inputRef.current && element.length > 0) {
            // Remove the current element and update the checkbox states
            setElement(element.filter((_, i) => i !== index));
            setCheckedState(checkedState.filter((_, i) => i !== index));

            // Update the state array and checkboxes refs
            objectList.stateArray.splice(index, 1);
            if(objectList.highlightArray.length > 1) {
                objectList.highlightArray.splice(index, 1)
            }
            if (objectList.highlightArray.length === 1) {
                objectList.highlightArray.splice(index,1,"white")
            }
            checkboxes.current.splice(index, 1);
            objectList.liArray.splice(index, 1);

            saveToLocalStorage()
            renderTasks(JSON.stringify(objectList, null, 2));
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
        objectList.stateArray[index] = updatedCheckedState[index] ? 1 : 0;
        if (objectList.stateArray[index] === 0){
            objectList.highlightArray.splice(index,1,"white")
        }
        if (objectList.stateArray[index] === 1){
            objectList.highlightArray.splice(index,1,"#28a745")
        }

        renderTasks(objectList.stateArray); // Update the state of the checkboxes
        saveToLocalStorage()
    };



    return (
        <div className={"containerForList"}>
            <button onClick={add} id={"add"} style={{borderRadius: "100%", width:"40px", textAlign: "center"}}>
                +
            </button>
            <ul>
                The list
                {element.map((item, index) => (
                    <li key={index} style={{backgroundColor:objectList.highlightArray[index]}}>
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
