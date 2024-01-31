document.addEventListener('DOMContentLoaded', function() {
    // Acceder a los elementos DOM y establecer los listeners aquí
    const bfsButton = document.getElementById("bfsButton");
    bfsButton.addEventListener("click", function() {
        solveWaterProblemBFS();
    });

    const dfsButton = document.getElementById("dfsButton");
    dfsButton.addEventListener("click", function() {
        solveWaterProblemDFS();
    });

    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", clearResults);
});

function isGoalState(state, target) {
    return state.large === target || state.small === target;
}




function solveWaterProblemBFS() {
    const jug1Cap = parseInt(document.getElementById("jug1_cap").value);
    const jug2Cap = parseInt(document.getElementById("jug2_cap").value);
    const target = parseInt(document.getElementById("target").value);

    const resultDivBFS = document.getElementById("outputBFS");
    resultDivBFS.innerHTML = "";  // Limpiar contenido anterior


        function isGoalState(state) {
            return state.large === target || state.small === target;
        }

        function generateNextStates(currentState) {
            const nextState1 = { large: jug1Cap, small: currentState.small };
            const nextState2 = { large: currentState.large, small: jug2Cap };
            const nextState3 = { large: 0, small: currentState.small };
            const nextState4 = { large: currentState.large, small: 0 };
            const nextState5 = { large: Math.max(0, currentState.large - (jug2Cap - currentState.small)), small: Math.min(jug2Cap, currentState.small + currentState.large) };
            const nextState6 = { large: Math.min(jug1Cap, currentState.large + currentState.small), small: Math.max(0, currentState.small - (jug1Cap - currentState.large)) };

            return [nextState1, nextState2, nextState3, nextState4, nextState5, nextState6];
        }

        const initialState = { large: 0, small: 0 };
    const queue = [{ state: initialState, path: [] }];
    const visitedStates = new Set();

    while (queue.length > 0) {
        const { state, path } = queue.shift();
        const currentStateString = JSON.stringify(state);

        if (!visitedStates.has(currentStateString)) {
            visitedStates.add(currentStateString);

            if (isGoalState(state)) {
                const resultHTML = path.map((step, index) => `<li>Paso ${index + 1}: Llenar ${step.large}-G y ${step.small}-P</li>`).join('');
                resultDivBFS.innerHTML += "<p><strong>Se encontró una solución:</strong></p>";
                resultDivBFS.innerHTML += "<ul>";
                resultDivBFS.innerHTML += "<li>Paso 1: Estar vacío 0-G y 0-P</li>";
                resultDivBFS.innerHTML += path.map((step, index) => `<li>Paso ${index + 2}: Llenar ${step.large}-G y ${step.small}-P</li>`).join('');
                resultDivBFS.innerHTML += "</ul>";
                return;
            }

            const nextStates = generateNextStates(state);
            for (const nextState of nextStates) {
                const nextStateString = JSON.stringify(nextState);
                if (!visitedStates.has(nextStateString)) {
                    queue.push({ state: nextState, path: [...path, nextState] });
                }
            }
        }
    }

    resultDivBFS.innerHTML += "<p>No se encontró una solución.</p>";
}


    /*if (isGoalState(state)) {
        resultDivBFS.innerHTML += "<p><strong>Se encontró una solución:</strong></p>";
        resultDivBFS.innerHTML += path.map((step, index) => `Paso ${index + 1}: Llenar ${step.large}-L y ${step.small}-S<br>`).join('');
    } else {
        resultDivBFS.innerHTML += "<p>No se encontró una solución.</p>";
    }*/



    function solveWaterProblemDFS() {
        const jug1Cap = parseInt(document.getElementById("jug1_cap").value);
        const jug2Cap = parseInt(document.getElementById("jug2_cap").value);
        const target = parseInt(document.getElementById("target").value);

        const resultDivDFS = document.getElementById("outputDFS");
        resultDivDFS.innerHTML = "";  // Limpiar contenido anterior

        function isGoalState(state) {
            return state.large === target || state.small === target;
        }

        function generateNextStates(currentState) {
            const nextState1 = { large: jug1Cap, small: currentState.small };
            const nextState2 = { large: currentState.large, small: jug2Cap };
            const nextState3 = { large: 0, small: currentState.small };
            const nextState4 = { large: currentState.large, small: 0 };
            const nextState5 = { large: Math.max(0, currentState.large - (jug2Cap - currentState.small)), small: Math.min(jug2Cap, currentState.small + currentState.large) };
            const nextState6 = { large: Math.min(jug1Cap, currentState.large + currentState.small), small: Math.max(0, currentState.small - (jug1Cap - currentState.large)) };

            return [nextState1, nextState2, nextState3, nextState4, nextState5, nextState6];
        }

        function dfs(currentState, path) {
            if (isGoalState(currentState)) {
                resultDivDFS.innerHTML += "<p><strong>Se encontró una solución:</strong></p>";
                resultDivDFS.innerHTML += "<ul>";
                path.forEach((step, index) => {
                    let actionDescription;
                    if (index === 0) {
                        actionDescription = "Estar vacío 0-G y 0-P";
                    } else {
                        actionDescription = `Llenar ${step.large}-G y ${step.small}-P`;
                    }
                    resultDivDFS.innerHTML += `<li>Paso ${index + 1}: ${actionDescription}</li>`;
                });
                resultDivDFS.innerHTML += "</ul>";
                return true;
            }

            const nextStates = generateNextStates(currentState);
            for (const nextState of nextStates) {
                const nextStateString = JSON.stringify(nextState);
                if (!visitedStates.has(nextStateString)) {
                    visitedStates.add(nextStateString);
                    if (dfs(nextState, [...path, nextState])) {
                        return true;
                    }
                }
            }

            return false;
        }

        const initialState = { large: 0, small: 0 };
        const visitedStates = new Set();

        if (!dfs(initialState, [initialState])) {
            resultDivDFS.innerHTML += "<p>No se encontró una solución.</p>";
        }
    }
    /*if (isGoalState(state)) {
        resultDivBFS.innerHTML += "<p><strong>Se encontró una solución:</strong></p>";
        resultDivBFS.innerHTML += path.map((step, index) => `Paso ${index + 1}: Llenar ${step.large}-L y ${step.small}-S<br>`).join('');
    } else {
        resultDivBFS.innerHTML += "<p>No se encontró una solución.</p>";
    }
        console.log("solveWaterProblemDFS llamada correctamente");*/

    function clearResults() {
    const outputBFS = document.getElementById("outputBFS");
    const outputDFS = document.getElementById("outputDFS");

    outputBFS.innerHTML = "";
    outputDFS.innerHTML = "";
}