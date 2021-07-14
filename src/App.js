import "./App.css";

import React from "react";

class Input {
  position = { x: 0, y: 0 };

  state = 0;

  constructor(id, x, y) {
    this.id = id;
    this.position.x = x;
    this.position.y = y;
  }

  get value() {
    return this.state;
  }

  toggle() {
    if (this.state === 0) {
      this.state = 1;
    } else {
      this.state = 0;
    }
  }
}

class Output {
  position = { x: 0, y: 0 };

  state = 0;

  constructor(id, x, y) {
    this.id = id;
    this.position.x = x;
    this.position.y = y;
  }

  get value() {
    return this.state;
  }
}

let _globalGateId = 1;

class CircuitBase {
  inputs = [];
  inputById = {};

  outputs = [];
  outputById = {};

  gates = {};
  connections = new Set();

  _inputId = 0;
  _outputId = 0;

  position = { x: 0, y: 0 };

  constructor(inputs, outputs, gates, connections, evaluationFn) {
    this.id = _globalGateId++;

    for (let inputIndex = 0; inputIndex < inputs; ++inputIndex) {
      const input = new Input(`${this.id}:i${this._inputId++}`, 0, 0);
      this.inputById[input.id] = input;
      this.inputs.push(input.id);
    }

    for (let outputIndex = 0; outputIndex < outputs; ++outputIndex) {
      const output = new Output(`${this.id}:o${this._outputId++}`, 0, 0);
      this.outputById[output.id] = output;
      this.outputs.push(output.id);
    }

    const gateByOldId = {};
    for (const gate of gates) {
      const g = new gate.constructorClass();
      this.gates[g.id] = g;
      gateByOldId[gate.oldId] = g;
    }

    for (const connection of connections) {
      let source,
        destination = "";

      if (connection.source.type === "self-input") {
        source = `${this.id}:i${connection.source.oldIndex}`;
      } else if (connection.source.type === "gate-output") {
        source = `${gateByOldId[connection.source.gateId].id}:${
          connection.source.nodeId
        }`;
      } else {
        console.log("wtf???");
      }

      if (connection.destination.type === "self-output") {
        destination = `${this.id}:o${connection.destination.oldIndex}`;
      } else if (connection.destination.type === "gate-input") {
        destination = `${gateByOldId[connection.destination.gateId].id}:${
          connection.destination.nodeId
        }`;
      } else {
        console.log("wtf???");
      }

      this.connections.add(`${source}-${destination}`);
    }

    if (evaluationFn) {
      this.evaluate = () => evaluationFn(this);
    }

    this.evaluate();
  }

  evaluate() {
    for (const input of Object.values(this.inputById)) {
      this.allDestinations(input.id).forEach((nodeId) =>
        this.updateNode(nodeId)
      );
    }
  }

  addInput(y) {
    const input = new Input(`${this.id}:i${this._inputId++}`, 0, y);

    this.inputById[input.id] = input;
    this.inputs.push(input.id);
  }

  addOutput(y) {
    const output = new Output(`${this.id}:o${this._outputId++}`, 0, y);

    this.outputById[output.id] = output;
    this.outputs.push(output.id);
  }

  addGate(gateClass, x, y) {
    const gate = new gateClass(x, y);

    this.gates[gate.id] = gate;
  }

  addConnection(source, destination) {
    this.connections.add(`${source}-${destination}`);

    this.updateNode(destination);
  }

  removeInput(inputId) {
    delete this.inputById[inputId];
    this.inputs.splice(this.inputs.indexOf(inputId));

    const updateList = new Set();

    for (const connection of this.connections) {
      const [source, destination] = connection.split("-");
      if (source === inputId) {
        this.connections.delete(connection);
        updateList.add(destination);
      }
    }

    for (const nodeId of updateList) {
      this.updateNode(nodeId);
    }
  }

  removeOutput(outputId) {
    delete this.outputById[outputId];
    this.outputs.splice(this.outputs.indexOf(outputId));

    for (const source of this.allSources(outputId)) {
      this.connections.delete(`${source}-${outputId}`);
    }
  }

  allDestinations(source) {
    const destinations = [];
    for (const connection of this.connections.values()) {
      const [_source, _destination] = connection.split("-");
      if (_source === source) {
        destinations.push(_destination);
      }
    }
    return destinations;
  }

  allSources(destination) {
    const sources = [];
    for (const connection of this.connections.values()) {
      const [_source, _destination] = connection.split("-");
      if (_destination === destination) {
        sources.push(_source);
      }
    }
    return sources;
  }

  getSourceValue(nodeId) {
    const [gateId] = nodeId.split(":");
    if (this.gates[gateId]) {
      return this.gates[gateId].outputById[nodeId].value;
    } else if (this.inputById[nodeId]) {
      return this.inputById[nodeId].value;
    } else {
      console.log("wtf???", nodeId);
      return 0;
    }
  }

  updateNode(nodeId) {
    const [gateId] = nodeId.split(":");
    if (this.gates[gateId]) {
      this.updateGate(gateId);
    } else if (this.outputById[nodeId]) {
      this.updateOutput(nodeId);
    } else {
      console.log("wtf???", nodeId);
    }
  }

  updateGate(gateId) {
    const gate = this.gates[gateId];

    for (const inputId of gate.inputs) {
      const input = gate.inputById[inputId];
      input.state = 0;
      for (const source of this.allSources(input.id)) {
        const value = this.getSourceValue(source);
        if (value === 1) {
          input.state = 1;
          break;
        }
      }
    }

    gate.evaluate();

    for (const outputId of gate.outputs) {
      const output = gate.outputById[outputId];
      for (const destination of this.allDestinations(output.id)) {
        this.updateNode(destination);
      }
    }
  }

  updateOutput(outputId) {
    const output = this.outputById[outputId];
    output.state = 0;
    for (const source of this.allSources(outputId)) {
      const value = this.getSourceValue(source);
      if (value === 1) {
        output.state = 1;
        break;
      }
    }
  }

  transformToGate(name) {
    const inputsCount = this.inputs.length;
    const outputsCount = this.outputs.length;

    const gates = [];
    for (const gate of Object.values(this.gates)) {
      gates.push({
        constructorClass: gate.constructor,
        oldId: gate.id,
      });
    }

    const connections = [];
    for (const connection of this.connections) {
      const [source, destination] = connection.split("-");

      const conn = {};

      const [sourceGate, sourceId] = source.split(":");
      const [destinationGate, destinationId] = destination.split(":");

      if (this.inputById[source]) {
        conn.source = {
          type: "self-input",
          nodeId: sourceId,
          oldIndex: this.inputs.indexOf(source),
        };
      } else if (this.gates[sourceGate]) {
        conn.source = {
          type: "gate-output",
          nodeId: sourceId,
          gateId: sourceGate,
        };
      }

      if (this.outputById[destination]) {
        conn.destination = {
          type: "self-output",
          nodeId: sourceId,
          oldIndex: this.outputs.indexOf(destination),
        };
      } else if (this.gates[destinationGate]) {
        conn.destination = {
          type: "gate-input",
          nodeId: destinationId,
          gateId: destinationGate,
        };
      }

      connections.push(conn);
    }

    console.log("create class", {
      name,
      inputsCount,
      outputsCount,
      gates,
      connections,
    });

    const newCircuitClass = createCircuit(
      name,
      inputsCount,
      outputsCount,
      gates,
      connections
    );

    return newCircuitClass;
  }
}

const createCircuit = (name, inputs, outputs, gates, connections, evalFn) => {
  return class DynamicGate extends CircuitBase {
    name = name;

    constructor(x = 0, y = 0) {
      super(inputs, outputs, gates, connections, evalFn);

      this.position.x = x;
      this.position.y = y;
    }
  };
};

const InputNode = ({ input, connections, ...rest }) => {
  return (
    <div
      id={input.id}
      {...rest}
      className={`circuit-input ${input.value === 1 ? "circuit-input-on" : ""}`}
      style={{
        left: input.position.x,
        top: input.position.y,
      }}
    ></div>
  );
};

const OutputNode = ({ output, connections, ...rest }) => {
  return (
    <div
      id={output.id}
      {...rest}
      className={`circuit-output ${
        output.value === 1 ? "circuit-output-on" : ""
      }`}
      style={{
        right: output.position.x,
        top: output.position.y,
      }}
    ></div>
  );
};

const GateNode = ({ gate, connections, onConnectionMade }) => {
  return (
    <div
      id={gate.id}
      className={`circuit-gate circuit-gate-${gate.type}`}
      style={{
        left: gate.position.x,
        top: gate.position.y,
      }}
      onMouseDown={(e) => {
        if (currentlyMovingGate) {
          return;
        }

        currentlyMovingGate = {
          gateId: gate.id,
          startMousePos: {
            x: e.clientX,
            y: e.clientY,
          },
          startGatePos: {
            x: gate.position.x,
            y: gate.position.y,
          },
        };
      }}
    >
      <div className="circuit-gate-inputs">
        {Object.values(gate.inputById).map((input) => (
          <div
            key={input.id}
            id={input.id}
            className={`circuit-gate-input ${
              input.value === 1 ? "circuit-gate-input-on" : ""
            }`}
            onMouseUp={() => {
              if (connectionStart) {
                onConnectionMade(connectionStart, input.id);
              }

              connectionStart = null;
            }}
          ></div>
        ))}
      </div>
      <div className="circuit-gate-name">{gate.name}</div>
      <div className="circuit-gate-outputs">
        {Object.values(gate.outputById).map((output) => (
          <div
            key={output.id}
            id={output.id}
            className={`circuit-gate-output ${
              output.value === 1 ? "circuit-gate-output-on" : ""
            }`}
            onMouseDown={(e) => {
              if (connectionStart) {
                return;
              }

              connectionStart = output.id;
              e.stopPropagation();
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

const Connection = ({ start, end, complete = false }) => {
  let x1, y1, x2, y2;

  const startNode = document.getElementById(start);
  const endNode = document.getElementById(end);

  if (complete) {
    if (!startNode || !endNode) {
      return null;
    }

    const startPos = startNode.getBoundingClientRect();
    const endPos = endNode.getBoundingClientRect();

    x1 = startPos.x + startPos.width / 2;
    y1 = startPos.y + startPos.height / 2;
    x2 = endPos.x + endPos.width / 2;
    y2 = endPos.y + endPos.height / 2;
  } else {
    if (!startNode) {
      return null;
    }

    const startPos = startNode.getBoundingClientRect();

    x1 = startPos.x + startPos.width / 2;
    y1 = startPos.y + startPos.height / 2;
    x2 = mousePos.x;
    y2 = mousePos.y;
  }

  return <line x1={x1} y1={y1} x2={x2} y2={y2} />;
};

const EmptyCurcuit = createCircuit("BASE", 0, 0, [], []);

let circuit = new EmptyCurcuit();

const AND_Gate = createCircuit("AND", 2, 1, [], [], function (gate) {
  const i1 = gate.inputById[gate.inputs[0]];
  const i2 = gate.inputById[gate.inputs[1]];
  const o1 = gate.outputById[gate.outputs[0]];

  if (i1.value === 1 && i2.value === 1) {
    o1.state = 1;
  } else {
    o1.state = 0;
  }
});

const NOT_Gate = createCircuit("NOT", 1, 1, [], [], function (gate) {
  const i1 = gate.inputById[gate.inputs[0]];
  const o1 = gate.outputById[gate.outputs[0]];

  if (i1.value === 1) {
    o1.state = 0;
  } else {
    o1.state = 1;
  }
});

let connectionStart = null;
let currentlyMovingGate = null;
let mousePos = { x: 0, y: 0 };
const availableGates = [
  { classPointer: AND_Gate, name: "AND" },
  { classPointer: NOT_Gate, name: "NOT" },
];

window.circuit = circuit;

function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const onConnection = (a, b) => {
    circuit.addConnection(a, b);

    forceUpdate();
  };

  return (
    <div className="App">
      <div
        className="circuit"
        onMouseUp={() => {
          connectionStart = null;
          currentlyMovingGate = null;

          forceUpdate();
        }}
        onMouseMove={(e) => {
          if (connectionStart) {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
            forceUpdate();
          }

          if (currentlyMovingGate) {
            const xDiff = e.clientX - currentlyMovingGate.startMousePos.x;
            const yDiff = e.clientY - currentlyMovingGate.startMousePos.y;

            const x = currentlyMovingGate.startGatePos.x + xDiff;
            const y = currentlyMovingGate.startGatePos.y + yDiff;

            circuit.gates[currentlyMovingGate.gateId].position.x = x;
            circuit.gates[currentlyMovingGate.gateId].position.y = y;

            forceUpdate();
          }
        }}
      >
        <div
          className="circuit-inputs"
          onClick={(e) => {
            circuit.addInput(e.clientY - 20);
            forceUpdate();
          }}
        />
        <div
          className="circuit-outputs"
          onClick={(e) => {
            circuit.addOutput(e.clientY - 20);
            forceUpdate();
          }}
        />
        {Object.values(circuit.inputById).map((input) => (
          <InputNode
            key={input.id}
            input={input}
            connections={circuit.connections}
            onClick={(e) => {
              if (e.ctrlKey) {
                circuit.removeInput(input.id);
              } else {
                input.toggle();
                circuit
                  .allDestinations(input.id)
                  .forEach((destination) => circuit.updateNode(destination));
              }

              forceUpdate();
            }}
            onMouseDown={() => {
              if (connectionStart) {
                return;
              }

              connectionStart = input.id;
            }}
          />
        ))}
        {Object.values(circuit.outputById).map((output) => (
          <OutputNode
            key={output.id}
            output={output}
            connections={circuit.connections}
            onClick={(e) => {
              if (e.ctrlKey) {
                circuit.removeOutput(output.id);
              }
              forceUpdate();
            }}
            onMouseUp={() => {
              if (connectionStart) {
                onConnection(connectionStart, output.id);
              }

              connectionStart = null;
            }}
          />
        ))}
        {Object.values(circuit.gates).map((gate) => (
          <GateNode
            key={gate.id}
            gate={gate}
            connections={circuit.connections}
            onConnectionMade={onConnection}
          />
        ))}
        <svg>
          {Array.from(circuit.connections).map((connection) => {
            const [start, end] = connection.split("-");
            return (
              <Connection key={connection} complete start={start} end={end} />
            );
          })}
          {connectionStart && (
            <>
              <Connection start={connectionStart} />
            </>
          )}
        </svg>
      </div>
      <div className="tools">
        <div className="tools-save">
          <input
            id="gate-name"
            className="tools-save-name"
            placeholder="New gate name"
          />
          <button
            className="tools-save-submit"
            onClick={(e) => {
              const nameInput = document.getElementById("gate-name");

              if (nameInput.value.length) {
                const gateClass = circuit.transformToGate(nameInput.value);

                availableGates.push({
                  name: nameInput.value,
                  classPointer: gateClass,
                });

                nameInput.value = "";
                circuit = new EmptyCurcuit();

                forceUpdate();
              }
            }}
          >
            Create
          </button>
        </div>
        <div className="tools-gates">
          {availableGates.map((gate) => (
            <div>
              <button
                className="tools-gate"
                key={gate.name}
                onClick={() => {
                  circuit.addGate(gate.classPointer, 50, 20);
                  forceUpdate();
                }}
              >
                {gate.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
