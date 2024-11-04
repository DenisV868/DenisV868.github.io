let jsonList = {
    "items" : [], // json seznam úkolů
    "dates" : [], // json seznam dat
    "colorsH" : ["#4CAF50"], // json seznam barev pro zvýrazněné úkoly
    //"idH" : [] // json seznam id elementu pro ktere0 budeme měnit barvu
    "checkboxState" : [],
    "darkModeState": []
}



$(document).ready(function() {

    let data = localStorage.getItem("toDos")// data z místního úložiště


    const add = $("#add"); // tlačítko přidat

    const remove = $("#remove"); // tlačítko odstranit

    const input = $("#new"); // vstup pro nové úkoly

    const removeInput = $("#removeIn"); // vstup pro odstraňování úkolů


    const changeColorV = $("#changeColor");

    const darkModeBtn = $("#darkMod");

    const header = $("#header")

    let edit = $("#edit");

    const done = $("#done");
//const info = $("#info");

    function hov(id, hoverStyle ) {//funkce pro hover

        if (!jsonList.colorsH || !Array.isArray(jsonList.colorsH)) {// kontrola existence json polí
            jsonList.colorsH = [];
        }
        id.on("mouseenter", function () {

            id.css("background-color", hoverStyle);
        })

        id.on("mouseleave", function () {
            if (jsonList.colorsH.length > 0) {
                id.css("background-color", jsonList.colorsH[0]);
            } else {
                //console.warn('colorsH is empty, resetting to default color.');
                id.css("background-color", '#4CAF50'); // Reset to default if array is empty
            }
        })


    }

    done.hide()
    //info.hide()

    hov(add, "#45a049")
    hov(remove, "crimson")
    hov(edit, "darkblue")
    hov(done,"darkcyan")
    hov(darkModeBtn, "black")

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth()+1;
let day = currentDate.getDate();
let current = $("#currentDate")
current.text("Datum: "+ day + '. ' + month + '. ' + year);
let dateInput = $("#date");

const list = $("#toDos");// ul v html

if (data) {

    // Převeďte JSON řetězec na objekt
    jsonList = JSON.parse(data);
    // zajistěte, aby existovala data
    if (!Array.isArray(jsonList.dates) || jsonList.dates.length === 0){
        jsonList.dates = []; // Inicializujte pole dat, pokud neexistuje
    }

    //jsonList.colorsH = []

    // Naplňte seznam z místního úložiště
    for (let i = 0; jsonList.items.length > i; i++) {
        let dateText = jsonList.dates[i]; // Získejte odpovídající datum a ukol
        let toDoText = jsonList.items[i];
        let toDo = $("<li>" + toDoText + " " + dateText + "</li>");
        toDo.attr("id", i).append($("<"+"input type='checkbox' id=''"+i +">")); // nastavení id dynamicky
        list.append(toDo);
        renderSortedTasks()
        localStorage.setItem("toDos", JSON.stringify(jsonList));
        //if (jsonList.checkboxState[i] === 1){
            //let toDoF =
            //toDo.attr("checked", "checked");

        //}
    }

    function highlighting() {
        $("li").removeClass("highlight");
        for (let j = 0; j < jsonList.checkboxState.length; j++) {
            if (jsonList.checkboxState[j] === 1) {
                let liId = j;//id pro li
                let li = $("#"+liId);// selekce li elementu
                let checkbox = $("#" + liId + " input[type='checkbox']");// input checkboxu
                li.addClass("highlight")//zvíraznění
                checkbox.prop("checked", true)//odškrtnutí
            }
            if (jsonList.checkboxState[j] === 0) {
                let liId = j;
                let li = $("#"+liId);
                let checkbox = $("#" + liId + " input[type='checkbox']");
                li.removeClass("highlight")
                checkbox.prop("checked", false)
            }
        }


    }

    highlighting();


    function changeColor(elementId,color) {
        $("#" + elementId).css("background-color", color); // vybarvý element o daném id

        if (!jsonList.colorsH || !Array.isArray(jsonList.colorsH)) {// kontrola existence json polí
            jsonList.colorsH = [];
        }
        if (!jsonList.idH || !Array.isArray(jsonList.idH)) {
            jsonList.idH = [];
        }
        if (jsonList.colorsH.length >= 0) {// kontrola delky
            //jsonList.idH.push(elementId);
            jsonList.colorsH.push(color);
            localStorage.setItem("toDos", JSON.stringify(jsonList));
            console.log(localStorage.getItem("toDos"));
        }
        if (jsonList.colorsH.length > 2) {// nahrazovani
            jsonList.colorsH.splice(0, 2, color)
            jsonList.colorsH.splice(0, 2, color)
            jsonList.idH.splice(0, 2, elementId)
            jsonList.idH.splice(0, 2, elementId)
            localStorage.setItem("toDos", JSON.stringify(jsonList));
            console.log(localStorage.getItem("toDos"));
        }
    }

    let editPress = 0;

    let count = 0; // počet úkolů

    let datesCount = jsonList.dates.length; // počet dat

    let btnPress = 0;

    let inputPress = 0;

    let darkModeBtnPress = 0;

    console.log(data);

    changeColorV.css("background-color", jsonList.colorsH[0]);// vypbarvení na uložené barvy
    header.css("background-color", jsonList.colorsH[0]);
    add.css("background-color", jsonList.colorsH[0]);
    remove.css("background-color", jsonList.colorsH[0]);
    edit.css("background-color", jsonList.colorsH[0]);
    darkModeBtn.css("background-color", jsonList.colorsH[0]);

    if (jsonList.colorsH[0] === "red") {
        hov(add, "#45a049")
        hov(remove, "crimson")
        hov(edit, "darkblue")
        hov(done,"darkcyan")
        hov(darkModeBtn, "black")
    }
    if (jsonList.colorsH[0] === "#4CAF50") {
        hov(add, "#45a049")
        hov(remove, "crimson")
        hov(edit, "darkblue")
        hov(done,"darkcyan")
        hov(darkModeBtn, "black")
    }
    if (jsonList.colorsH[0] === "blue") {
        hov(add, "#45a049")
        hov(remove, "crimson")
        hov(edit, "darkblue")
        hov(done,"darkcyan")
        hov(darkModeBtn, "black")
    }

    if (!jsonList.darkModeState || !Array.isArray(jsonList.darkModeState)) {// kontrola existence json pole
        jsonList.darkModeState = [];
    }

    if(jsonList.colorsH[0] !== "grey"){

        $("body").css("background-color", "white");
        $("p").css("color", "black");
        $("footer").css("color", "black");
        darkModeBtn.text("tmavý mod");
        hov(add, "#45a049")
        hov(remove, "crimson")
        hov(edit, "darkblue")
        hov(done,"darkcyan")
        hov(darkModeBtn, "black")
        darkModeBtnPress = 0

    }
    if (jsonList.colorsH[0] === "grey"){

        $("body").css("background-color", "black");
        $("p").css("color", "white");
        $("footer").css("color", "white");
        darkModeBtn.text("default mod")
        hov(add, "darkgrey")
        hov(remove, "darkgrey")
        hov(changeColorV, "darkgrey")
        hov(edit, "darkgrey")
        hov(darkModeBtn, "darkgrey")
        darkModeBtnPress++;


    }

    function remIndex(indexToRemove) { // odstraňování indexů

        if (
            indexToRemove > -1 &&
            indexToRemove < jsonList.items.length &&
            indexToRemove < jsonList.dates.length &&
            indexToRemove < jsonList.checkboxState.length
        ) {
            jsonList.items.splice(indexToRemove, 1); // Odstraňte z položek
            jsonList.dates.splice(indexToRemove, 1);  // Odstraňte z data
            jsonList.checkboxState.splice(indexToRemove, 1);
        }

    }

    function actualization() {

        console.log("Aktualní počet úkolů: " + jsonList.items.length);//kontraola počtu a id úkolů
        console.log("json aktualizace: ", JSON.stringify(jsonList, null, 2));// json aktualizace
        localStorage.setItem("toDos", JSON.stringify(jsonList))// aktualizace místního úložiště
        console.log(localStorage.getItem("toDos"));// aktualizace místního úložiště výpis

    }



    function magic(toDoTxt, date) {// funkce, která provádí kouzlo přidávání
        let toDo = $("<li>" + toDoTxt + " " + date + "</li>"); // část úkolu seznamu úkolů
            //toDo.attr("id", jsonList.items.length + 1).append($("<input type='checkbox'>")); // nastavuje id dynamicky a přidává checkbox, pokud je rovno nule
       // } else {
            toDo.attr("id", count).append("<"+"input type = 'checkbox' id =''" +count+">")// nastavuje id dynamicky a přidává checkbox
        //}
        //toDo.css("width",toDo.length + "px");
        console.log("Id přidaného úkolu: " + toDo.attr("id")); // kontrola, zda bylo id nastaveno
        list.append(toDo); // přidání úkolu do seznamu
        jsonList.checkboxState.push(0)
        jsonList.items.push(toDoTxt); // přidání úkolu do json
        jsonList.dates.push(date); // přidání data do json
        console.log("Aktuální počet úkolů: " + jsonList.items.length); // aktuální počet úkolů a dat
        console.log("aktualizace json: ", JSON.stringify(jsonList, null, 2)); // kontrola json
        localStorage.setItem("toDos", JSON.stringify(jsonList));
        console.log(localStorage.getItem("toDos")); // výstup místního úložiště
        input.val(""); // vyprázdnění vstupu pro nový úkol
        dateInput.val(""); //  čištění input pro další input

        renderSortedTasks();

    }

    function adding() { // funkce pro přidání
        let toDoText = input.val(); // text pro seznam a json
        let date = dateInput.val(); // datum pro seznam a json

        if(toDoText.length === 0 && date.length === 0){
            $("input[type = 'text']").addClass("high1")
            alert("chybí název a datum úkolu")
        }

        if(toDoText.length === 0 && date.length > 0){
            input.addClass("high1")
            alert("chybí název")
        }

        if(date.length === 0 && toDoText.length > 0){
            dateInput.addClass("high1")
            alert("chybí datum")
        }

        if(toDoText.length > 0 && date.length > 0) {
            magic(toDoText, date);
            highlighting()
        }
    }
    function renderSortedTasks() {
        list.empty(); // Vyprázdněte existující seznam
        const sortedTasks = sortTasksByDate(jsonList); // Seřaďte úkoly podle data
        sortedTasks.forEach(item => {
            const li = $("<li></li>").text(`${item.task} ${item.date}`); // Vytvořte <li> element
            li.attr("id", item.id).append($("<"+"input type='checkbox' id=''"+ item.id +">")).append($("<"+"button id='B'"+">×</button>")); // Nastavte id a přidejte checkbox
            //if (jsonList.checkboxState[item.id] === 1) { // Adjust for zero-based index
                //li.addClass("highlight")
                //li.find("input[type='checkbox']").prop("checked", true);
            //}
            highlighting()
            list.append(li); // Přidejte seřazené <li> do <ul>
        });
    }

    function sortTasksByDate(jsonList) {
        //const currentDate = new Date(); // Získejte aktuální datum

        // Spojte položky a data do pole objektů s úkolem, datem a zpracovaným datem
        const combinedList = jsonList.items.map((task, index) => ({
            id: index,
            task: task,
            date: jsonList.dates[index],
            checkboxState: jsonList.checkboxState[index],
            parsedDate: parseDate(jsonList.dates[index])
        }));

        // Seřaďte úkoly na základě zpracovaného data (nejdříve nejdřívější datum)
        return combinedList.sort((a, b) => a.parsedDate - b.parsedDate);
    }

    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('.').map(Number); // Převeďte části data na čísla
        return new Date(year, month, day); // Vraťte objekt Data
    }

    // Přidání CSS třídy pro zvýraznění
    const highlightClass = "highlight"; // Třída pro zvýraznění


    add.click(function () {// pokud je kliknuto na tlačítko přidat

        adding();// volání funkce add

        if (jsonList.items.length !== 0) {
            count++;
        }else{
            count = 0;
        }

    })

// Použití delegace události pro zpracování kliknutí na zaškrtávací políčka
     list.on("click" ,"input[type=checkbox]",function () {

        if (!jsonList.checkboxState || !Array.isArray(jsonList.checkboxState)) {// kontrola existence json pole
            jsonList.checkboxState = [];
        }

        let liElement = $(this).closest("li"); // Najdi rodičovské <li>
        if (jsonList.checkboxState.length !== jsonList.items.length) {
            jsonList.checkboxState.splice(jsonList.items.length-1);
        }
        if (this.checked) {
            liElement.addClass(highlightClass); // Přidej třídu pro zvýraznění
            if (jsonList.checkboxState.length+1 <= jsonList.items.length) {// kontrola jestli delka neprevisuje korespondujici array
                jsonList.checkboxState.push(1)
            }
            if (jsonList.checkboxState.length === jsonList.items.length) {
                jsonList.checkboxState[Number(liElement.attr("id"))] = 1
            }
            localStorage.setItem("toDos", JSON.stringify(jsonList));
            console.log(localStorage.getItem("toDos"));
        } else {
            liElement.removeClass(highlightClass); // Odeber třídu pro zvýraznění
            if(jsonList.checkboxState.length === jsonList.items.length) {
                let index = Number(liElement.attr("id"))
                jsonList.checkboxState[index] = 0;
                localStorage.setItem("toDos", JSON.stringify(jsonList));
                console.log(localStorage.getItem("toDos"));
            }
        }
    });

    removeInput.val("")

    function editPressCheck() {//funkce k sledování stisku tlačítka změna barev

        if (editPress === 0) {
            changeColorV.show()
            darkModeBtn.show()
            editPress++
        }else{
            changeColorV.hide()
            darkModeBtn.hide()
            editPress--
        }


    }

    changeColorV.hide()
    darkModeBtn.hide()

    let pressNum = 0

    list.on("click","button" , function () {
        let li = $(this).closest("li")
        let text = li.text();
        let conformationR = confirm(`Jste si jist/a že chcete odstranit tento úkol: ${text.slice(0,-1)}`)
        if (conformationR) {
            alert("Úkol odstraněn")
            li.remove()
            remIndex(Number(li.attr("id")))
            count--;
            actualization();
            renderSortedTasks();
        } else if (conformationR === false) {
            alert("Akce zrušená")
        }

    })


    changeColorV.click(function () {
        if (pressNum === 0) {//pokud nebylo tlačítko stisknute nebo bylo už po třetí
            if(jsonList.colorsH[0] !== "red") {// pokud je na indexu nula v json array pro barvy stejná barva změní ji to na další
                changeColor("header", "red")
                changeColor("changeColor", "red")
                changeColor("add", "red")
                changeColor("remove", "red")
                changeColor("edit", "red")
                 changeColor("done", "red")
                changeColor("darkMod","red")
                pressNum++;
            } else {
                pressNum++;
            }
    } else if (pressNum === 1) {// pokud je na indexu nula v json array pro barvy stejná barva změní ji to na další
            if(jsonList.colorsH[0] !== "blue") {
                changeColor("header", "blue")
                changeColor("changeColor", "blue")
                changeColor("add", "blue")
                changeColor("remove", "blue")
                changeColor("edit", "blue")
                changeColor("done", "blue")
                changeColor("darkMod","blue")
                pressNum++;
            }else {
                pressNum++;
            }
        }
        else if (pressNum === 2) {// pokud je na indexu nula v json array pro barvy stejná barva změní ji to na další
            if(jsonList.colorsH[0] !== "#4CAF50") {
                changeColor("header", "#4CAF50")
                changeColor("changeColor", "#4CAF50")
                changeColor("add", "#4CAF50")
                changeColor("remove", "#4CAF50")
                changeColor("edit", "#4CAF50")
                changeColor("done", "#4CAF50")
                changeColor("darkMod","#4CAF50")
                pressNum = 0;
            }else {
                pressNum = 0;
            }
        }

    })

    darkModeBtn.click(function () {
        if (darkModeBtnPress === 0) {
            changeColorV.hide()
            darkModeBtn.hide()
            $("p").css("color", "white")
            $("footer").css("color", "white")
            $("body").css("background-color", "black")
            changeColor("header", "grey")
            changeColor("changeColor", "grey")
            changeColor("add", "grey")
            changeColor("remove", "grey")
            changeColor("edit", "grey")
            changeColor("done", "grey")
            darkModeBtn.text("default mod")
            hov(darkModeBtn, "black")
            hov(add, "darkgrey")
            hov(remove, "darkgrey")
            hov(edit, "darkgrey")
            hov(done,"darkgrey")
            hov(darkModeBtn, "darkgrey")
            if (!jsonList.darkModeState || !Array.isArray(jsonList.darkModeState)) {// kontrola existence json polí
                jsonList.darkModeState = [];
            }
            if (jsonList.darkModeState.length > 0) {// kontrola delky
                //jsonList.idH.push(elementId);
                jsonList.darkModeState.push("ANO")
                localStorage.setItem("toDos", JSON.stringify(jsonList));
                console.log(localStorage.getItem("toDos"));
            }
            darkModeBtnPress++;
        }
         else if (darkModeBtnPress === 1) {
            changeColorV.hide()
            darkModeBtn.hide()
            $("p").css("color", "black")
            $("footer").css("color", "black")
            $("body").css("background-color", "white")
            changeColor("header", "#4CAF50")
            changeColor("changeColor", "#4CAF50")
            changeColor("add", "#4CAF50")
            changeColor("remove", "#4CAF50")
            changeColor("edit", "#4CAF50")
            changeColor("done", "#4CAF50")
            changeColor("darkMod","#4CAF50")
            darkModeBtn.text("tmavý mod")
            hov(darkModeBtn, "black")
            hov(add, "#45a049")
            hov(remove, "crimson")
            hov(edit, "darkblue")
            hov(done,"darkcyan")
            hov(darkModeBtn, "black")
            if (!jsonList.darkModeState || !Array.isArray(jsonList.darkModeState)) {// kontrola existence json polí
                jsonList.darkModeState = [];
            }
            if (jsonList.darkModeState.length > 0) {// kontrola delky
                //jsonList.idH.push(elementId);
                jsonList.darkModeState.splice(0, 1,"NE");
                localStorage.setItem("toDos", JSON.stringify(jsonList));
                console.log(localStorage.getItem("toDos"));
            }
            darkModeBtnPress--;

        }

    })


    input.keypress(function (e) {
        if (13 === e.keyCode) {// přidá, pokud je stisknuto enter, kód pro enter je 13

            adding();// volání funkce add

            if (jsonList.items.length !== 0) {
                count++;
            }else{
                count = 0;
            }

        }
    })

    dateInput.keypress(function (e) {
        if (13 === e.keyCode) {// přidá, pokud je stisknuto enter, kód pro enter je 13

            adding();// volání funkce add

            if (jsonList.items.length !== 0) {
                count++;
            }else{
                count = 0;
            }

        }
    })

    list.on("mouseenter", "input[type=checkbox]", function () {

        let liEl = $(this).closest("li");
        liEl.addClass("hev")

    })

    list.on("mouseleave", "input[type=checkbox]", function () {
        let liEl = $(this).closest("li");
        liEl.removeClass("hev")
    })

    if (0 === inputPress) { // nastavte skrytou pozici tlačítka hotovo a removeInput jako skryté
        removeInput.hide(); // skrytí vstupu pro odstraňování
        done.hide(); // skrytí tlačítka hotovo
        //info.hide(); // skrytí informací
    }

    remove.click(function () {
        if (jsonList.items.length === 0) {
            let input = $("input[type=text]");
            input.addClass("high1")
            alert("Aby jste mohl/a odstraňovat úkoly musíte přidat úkoly")

        }
        if (jsonList.items.length > 0) {
            removing(); // Volání funkce odstraňování
            highlighting();//volání funkce pro zvíraznění
        }
    })

    $("input[type=text]").click(function () {
        if($(this).attr("class")==="high1"){
            $("input[type = text]").removeClass("high1")
        }
    })

    removeInput.keypress(function (e) {
        if (e.keyCode === 13) {//remove if enter is pressed, enters code is 13

            removing(); // Volání funkce odstraňování
            highlighting();//volání funkce pro zvíraznění

        }
    })

    removeInput.click(function () {// sledování kliknutí na vstup
        if (inputPress !== 1) {
            inputPress++;
        }
    })

    function hiding() {

        if (1 === btnPress) {// kontrola, zda je výstup v pořádku, vzhledem k tomu, že uživatel mohl omylem kliknout
            removeInput.hide(); // skrytí vstupu pro odstraňování
            done.hide(); // skrytí tlačítka
            //info.hide(); // skrytí informací
        }
        if(jsonList.items.length === 0) {
            removeInput.hide(); // skrytí vstupu pro odstraňování
            done.hide(); // skrytí tlačítka
        }

    }


    done.click(function () {
        removeInput.val("")
        hiding();

    })

    $(document).keydown(function (event) {
        if (event.key === "Escape") {  // Zkontrolujte klávesu Escape na vyskočení z odstranovaciho modu
            removeInput.val("")
            hiding();
        }
    });

    edit.click(function () {// stisknutí tlačítka změna barev

        editPressCheck()

    })

    $(document).keydown(function (event) {
        if (event.key === "Escape" && editPress === 1) {  // Zkontrolujte klávesu Escape
            editPressCheck()
        }
    });

    $("#removeOptionsToggle").click(function() {//rozbalování rozbalovacího menu
        $("#removeIn").slideToggle();
    });

    removeInput.on("click","option[value=vše]",function() {//získání hodnoty z stisknuté volby z menu
        removeInput.val("vše");
    })

    removeInput.on("click","option[value=odškrtnuté]",function() {//získání hodnoty z stisknuté volby z menu
        removeInput.val("odškrtnuté");
    })

    removeInput.on("click","option[value=neodškrtnuté]",function() {//získání hodnoty z stisknuté volby z menu
        removeInput.val("neodškrtnuté")
    })

    function removing() {

        if (1 === btnPress) {
            btnPress = 0;
        }
        if (1 !== btnPress) {
            if (0 >= count) {
                count = 0;// nulování
                datesCount = 0// nulování
            } if (jsonList.items.length > 0) {//controla počtu úkolu
                removeInput.show(); // zobrazení removeInput
                done.css("background-color", jsonList.colorsH[0]);
                done.show(); // zobrazení tlačítka hotovo
                //info.show(); // zobrazení informací
                if(removeInput.val() === "vše") {//odstranění všech úkolu
                    let conformation = confirm("opravdu chcete odstranit všechny úkoly")//potvrzen9
                    if (conformation) {
                        jsonList.items = []; // odstranění všech prvků z json pole
                        jsonList.dates = []; // odstranění všech prvků z json pole
                        jsonList.checkboxState = [];//  odstranění všech prvků z json pole
                        localStorage.setItem("toDos", JSON.stringify(jsonList)); // aktualizace místního úložiště
                        $("li").remove()// odstranění všech úkolů
                        removeInput.val("")
                        removeInput.hide()
                        done.hide()
                        count = 0
                        actualization();
                        renderSortedTasks()
                        btnPress++;
                    }
                }
                if(removeInput.val() === "odškrtnuté"){//odstranění všech odškrtnutých úkolu
                    let conformation = confirm("opravdu chcete odstranit všechny odškrtnuté úkoly")//potvrzen9
                    if (conformation) {
                        $(".highlight").remove()
                        for (let i = jsonList.checkboxState.length - 1; i >= 0; i--) {
                            if (jsonList.checkboxState[i] === 1) {
                                jsonList.checkboxState.splice(i, 1)
                                jsonList.items.splice(i, 1)
                                jsonList.dates.splice(i, 1)
                                actualization();
                                renderSortedTasks()
                            }
                        }
                        btnPress++;
                    }
                }

                if(removeInput.val() === "neodškrtnuté"){//odstranění všech neodškrtnutých úkolu
                    let conformation = confirm("opravdu chcete odstranit všechny neodškrtnuté úkoly")//potvrzen9
                    if (conformation) {
                        for (let i = jsonList.checkboxState.length - 1; i >= 0; i--) {
                            if (jsonList.checkboxState[i] === 0) {
                                let li = $("#" + i);
                                if (li.attr("class") !== "highlight") {
                                    li.remove();
                                }
                                jsonList.checkboxState.splice(i, 1)
                                jsonList.items.splice(i, 1)
                                jsonList.dates.splice(i, 1)
                                actualization();
                                renderSortedTasks()
                            }
                        }
                        btnPress++;
                    }
                }
                /*let idToRemove = $("#" + Number(removeInput.val()));//výběr úkolu na odstranění
                idToRemove.remove();//odstranění
                remIndex(Number(removeInput.val()) - 1)//odsstranění indexu z json pole
                console.log("Id odstraněného úkolů: "+removeInput.val())//kontrola id odstraněného úkoli
                removeInput.val(""); // čištění input pro nový input
                count--

                actualization()
                renderSortedTasks()*/
            }
        }


    }

    //removeInput.click(function () {



    //})

    $(document).on("beforeunload", function () {
        localStorage.setItem("toDos", JSON.stringify(jsonList));
    })

}
})