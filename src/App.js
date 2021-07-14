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

class NOT_Gate {
  name = "NOT";
  type = "not";
  position = { x: 0, y: 0 };

  inputs = [];

  outputs = [];

  constructor(id, x, y) {
    this.id = id;

    this.position.x = x;
    this.position.y = y;

    this.inputs.push(new Input(`${this.id}:i1`));

    this.outputs.push(new Output(`${this.id}:o1`));

    this.evaluate();
  }

  evaluate() {
    if (this.inputs[0].value === 1) {
      this.outputs[0].state = 0;
    } else {
      this.outputs[0].state = 1;
    }
  }
}

class AND_Gate {
  name = "AND";
  type = "and";
  position = { x: 0, y: 0 };

  inputs = [];

  outputs = [];

  constructor(id, x, y) {
    this.id = id;
    this.position.x = x;
    this.position.y = y;

    this.inputs.push(new Input(`${this.id}:i1`));
    this.inputs.push(new Input(`${this.id}:i2`));

    this.outputs.push(new Output(`${this.id}:o1`));

    this.evaluate();
  }

  evaluate() {
    if (this.inputs[0].value === 1 && this.inputs[1].value === 1) {
      this.outputs[0].state = 1;
    } else {
      this.outputs[0].state = 0;
    }
  }
}

class Circuit {
  _gateId = 1;
  _inputId = 1;
  _outputId = 1;

  inputs = {};
  outputs = {};
  gates = {};
  connections = new Set();

  addInput(y) {
    const input = new Input(`c:i${this._inputId++}`, 0, y);

    this.inputs[input.id] = input;
  }

  addOutput(y) {
    const output = new Output(`c:o${this._outputId++}`, 0, y);

    this.outputs[output.id] = output;
  }

  addGate(gateClass, x, y) {
    const id = `g${this._gateId++}`;
    const gate = new gateClass(id, x, y);

    this.gates[gate.id] = gate;
  }

  addConnection(a, b) {
    this.connections.add(`${a}-${b}`);

    const [gate] = b.split(":");

    if (gate === "c") {
      this.updateOutput(b);
    } else if (this.gates[gate]) {
      this.updateGate(gate);
    } else {
      console.error("unknown destination", b);
    }
  }

  removeInput(inputId) {
    delete this.inputs[inputId];

    const updateList = new Set();

    for (const connection of Array.from(this.connections)) {
      const [source, destination] = connection.split("-");
      if (source === inputId) {
        this.connections.delete(connection);

        const [gate] = destination.split(":");
        if (gate === "c") {
          updateList.add(destination);
        } else {
          updateList.add(gate);
        }
      }
    }

    for (const item of updateList) {
      if (item[0] === "c") {
        this.updateOutput(item);
      } else {
        this.updateGate(item);
      }
    }
  }

  removeOutput(outputId) {
    delete this.outputs[outputId];

    for (const source of this.allIncomingSignals(outputId)) {
      this.connections.delete(`${source}-${outputId}`);
    }
  }

  getSourceValue(source) {
    const [gate] = source.split(":");
    if (gate === "c") {
      return this.inputs[source].value;
    } else {
      return this.gates[gate].outputs.find((output) => output.id === source)
        .value;
    }
  }

  allIncomingSignals(destination) {
    const signals = [];
    for (const connection of this.connections.values()) {
      const [a, b] = connection.split("-");
      if (b === destination) {
        signals.push(a);
      }
    }
    return signals;
  }

  allOutcomingSignals(source) {
    const signals = [];
    for (const connection of this.connections.values()) {
      const [a, b] = connection.split("-");
      if (a === source) {
        signals.push(b);
      }
    }
    return signals;
  }

  updateGate(gateId) {
    const gate = this.gates[gateId];

    for (const gateInput of gate.inputs) {
      gateInput.state = 0;
      for (const signal of this.allIncomingSignals(gateInput.id)) {
        const value = this.getSourceValue(signal);
        if (value === 1) {
          gateInput.state = 1;
          break;
        }
      }
    }

    gate.evaluate();

    for (const gateOutput of gate.outputs) {
      for (const signal of this.allOutcomingSignals(gateOutput.id)) {
        const [gate] = signal.split(":");
        if (gate === "c") {
          this.updateOutput(signal);
        } else {
          this.updateGate(gate);
        }
      }
    }
  }

  updateOutput(outputId) {
    for (const signal of circuit.allIncomingSignals(outputId)) {
      const value = this.getSourceValue(signal);
      if (value === 1) {
        this.outputs[outputId].state = 1;
        return;
      }
    }

    this.outputs[outputId].state = 0;
  }
}

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
        {gate.inputs.map((input) => (
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
        {gate.outputs.map((output) => (
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

const circuit = new Circuit();
circuit.addGate(AND_Gate, 100, 100);
circuit.addGate(NOT_Gate, 300, 100);

let connectionStart = null;
let currentlyMovingGate = null;
let movingDiff = { x: 0, y: 0 };
let mousePos = { x: 0, y: 0 };
const availableGates = [
  { classPointer: AND_Gate, name: "AND" },
  { classPointer: NOT_Gate, name: "NOT" },
];

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
        {Object.values(circuit.inputs).map((input) => (
          <InputNode
            key={input.id}
            input={input}
            connections={circuit.connections}
            onClick={(e) => {
              if (e.ctrlKey) {
                circuit.removeInput(input.id);
              } else {
                input.toggle();
                for (const destination of circuit.allOutcomingSignals(
                  input.id
                )) {
                  const [gate] = destination.split(":");
                  if (circuit.gates[gate]) {
                    circuit.updateGate(gate);
                  } else if (gate === "c") {
                    circuit.updateOutput(destination);
                  }
                }
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
        {Object.values(circuit.outputs).map((output) => (
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
      {availableGates.map((gate) => (
        <div
          onClick={() => {
            circuit.addGate(gate.classPointer, 300, 300);
            forceUpdate();
          }}
        >
          {gate.name}
        </div>
      ))}
    </div>
  );
}

export default App;
