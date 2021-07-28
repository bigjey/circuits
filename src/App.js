import "./App.css";

import React from "react";

const LOCALSTORAGE_KEY = "circuit-data";
const GATE_COLORS = [
  "e07800",
  "0969d7",
  "b80000",
  "65a300",
  "c31fff",
  "9fb800",
  "00e083",
];

const debounce = (fn, time) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, time);
  };
};

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

  static fromJS(config) {
    const input = new Input();
    input.id = config.id;
    input.position = config.position;
    input.state = config.state;
    return input;
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

  static fromJS(config) {
    const output = new Output();
    output.id = config.id;
    output.position = config.position;
    output.state = config.state;
    return output;
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
    this.color = GATE_COLORS[this.id % GATE_COLORS.length];

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

  getOutputsState() {
    const state = {};
    for (const outputId of this.outputs) {
      state[outputId] = this.outputById[outputId].value;
    }
    return state;
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
    this.inputs.splice(this.inputs.indexOf(inputId), 1);

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
    this.outputs.splice(this.outputs.indexOf(outputId), 1);

    for (const source of this.allSources(outputId)) {
      this.connections.delete(`${source}-${outputId}`);
    }
  }

  removeGate(gateId) {
    const gate = this.gates[gateId];
    for (const input of Object.values(gate.inputById)) {
      this.allSources(input.id).forEach((source) => {
        this.connections.delete(`${source}-${input.id}`);
      });
    }
    for (const output of Object.values(gate.outputById)) {
      this.allDestinations(output.id).forEach((destination) => {
        this.connections.delete(`${output.id}-${destination}`);
        this.updateNode(destination);
      });
    }
    delete this.gates[gateId];
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
      this.updateGate(gateId, nodeId);
    } else if (this.outputById[nodeId]) {
      this.updateOutput(nodeId);
    } else {
      console.log("wtf???", nodeId);
    }
  }

  updateGate(gateId, nodeId) {
    const gate = this.gates[gateId];

    for (const iId of gate.inputs) {
      if (iId !== nodeId) {
        continue;
      }
      const input = gate.inputById[iId];
      input.state = 0;
      // update only if we potentially change from 0->1 or 1->0
      for (const source of this.allSources(input.id)) {
        const value = this.getSourceValue(source);
        if (value === 1) {
          input.state = 1;
          break;
        }
      }
    }

    const prevState = gate.getOutputsState();
    gate.evaluate();

    for (const outputId of gate.outputs) {
      const output = gate.outputById[outputId];
      if (prevState[outputId] === output.value) {
        continue;
      }
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
        constructorName: gate.constructor.staticName,
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

    const newCircuitClass = createCircuit(
      name,
      inputsCount,
      outputsCount,
      gates,
      connections
    );

    return newCircuitClass;
  }

  toJS() {
    const data = {
      inputs: this.inputs,
      inputById: this.inputById,
      outputs: this.outputs,
      outputById: this.outputById,
      gates: this.gates,
      connections: Array.from(this.connections),
      _inputId: this._inputId,
      _outputId: this._outputId,
      position: this.position,
    };
    return data;
  }

  fromJS(data) {
    this.inputs = data.inputs;
    this.inputById = Object.values(data.inputById).reduce(
      (inputs, inputConfig) => {
        inputs[inputConfig.id] = Input.fromJS(inputConfig);
        return inputs;
      },
      {}
    );
    this.outputs = data.outputs;
    this.outputById = Object.values(data.outputById).reduce(
      (outputs, outputConfig) => {
        outputs[outputConfig.id] = Output.fromJS(outputConfig);
        return outputs;
      },
      {}
    );

    this.connections = new Set(data.connections);

    this._inputId = data._inputId;
    this._outputId = data._outputId;
    this.position = data.position;

    this.gates = Object.values(data.gates).reduce((gates, gateConfig) => {
      const gateClass = availableGates
        .concat(customGates)
        .find(
          (gateConstructor) =>
            gateConstructor.classPointer.staticName === gateConfig.name
        );
      if (gateClass) {
        const gate = new gateClass.classPointer(
          gateConfig.position.x,
          gateConfig.position.y
        );

        gates[gate.id] = gate;
      }
      return gates;
    }, {});

    Object.values(this.gates).forEach((gate) => {
      this.updateGate(gate.id);
    });
  }
}

let globalCircuitId = 0;
const createCircuit = (name, inputs, outputs, gates, connections, evalFn) => {
  const args = JSON.stringify({
    name,
    inputs,
    outputs,
    gates,
    connections,
  });
  const result = class DynamicGate extends CircuitBase {
    static initialArgs = args;
    static color = GATE_COLORS[globalCircuitId++ % GATE_COLORS.length];
    name = name;

    constructor(x = 0, y = 0) {
      super(inputs, outputs, gates, connections, evalFn);

      this.position.x = x;
      this.position.y = y;
    }
  };
  result.staticName = name;
  return result;
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

const GateNode = ({ gate, connections, onConnectionMade, onRemove }) => {
  return (
    <div
      id={gate.id}
      className={`circuit-gate circuit-gate-${gate.type}`}
      style={{
        left: gate.position.x,
        top: gate.position.y,
        background: `#${gate.constructor.color}`,
      }}
      onClick={(e) => {
        if (e.shiftKey) {
          circuit.removeGate(gate.id);
          onRemove();
          e.stopPropagation();
        }
      }}
      onTouchStart={(e) => {
        if (e.shiftKey) {
          circuit.removeGate(gate.id);
          onRemove();
          e.stopPropagation();
        }
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
      onTouchMove={(e) => {
        if (currentlyMovingGate) {
          return;
        }

        currentlyMovingGate = {
          gateId: gate.id,
          startMousePos: {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
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
            onTouchEnd={() => {
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
            onTouchStart={(e) => {
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

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => {
    updateState({});
  }, []);

  React.useEffect(() => {
    setImmediate(forceUpdate);
  }, []);

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

const saveAppState = () => {
  try {
    const data = JSON.stringify({
      circuit: circuit.toJS(),
      customGates: customGates.map((gate) => {
        return gate.classPointer.initialArgs;
      }),
    });
    localStorage.setItem(LOCALSTORAGE_KEY, data);
  } catch (e) {
    console.log(e);
  }
};

function App() {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => {
    // saveAppStateDebounced();
    updateState({});
  }, []);

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
        onTouchEnd={() => {
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
        onTouchMove={(e) => {
          if (connectionStart) {
            mousePos.x = e.touches[0].clientX;
            mousePos.y = e.touches[0].clientY;
            forceUpdate();
          }

          if (currentlyMovingGate) {
            const xDiff =
              e.touches[0].clientX - currentlyMovingGate.startMousePos.x;
            const yDiff =
              e.touches[0].clientY - currentlyMovingGate.startMousePos.y;

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
        >
          {Object.values(circuit.inputById).map((input) => (
            <InputNode
              key={input.id}
              input={input}
              connections={circuit.connections}
              onClick={(e) => {
                if (e.shiftKey) {
                  circuit.removeInput(input.id);
                } else {
                  input.toggle();
                  circuit
                    .allDestinations(input.id)
                    .forEach((destination) => circuit.updateNode(destination));
                }

                e.stopPropagation();

                forceUpdate();
              }}
              onMouseDown={() => {
                if (connectionStart) {
                  return;
                }

                connectionStart = input.id;
              }}
              onTouchStart={() => {
                if (connectionStart) {
                  return;
                }

                connectionStart = input.id;
              }}
            />
          ))}
        </div>
        <div
          className="circuit-outputs"
          onClick={(e) => {
            circuit.addOutput(e.clientY - 20);
            forceUpdate();
          }}
        >
          {Object.values(circuit.outputById).map((output) => (
            <OutputNode
              key={output.id}
              output={output}
              connections={circuit.connections}
              onClick={(e) => {
                if (e.shiftKey) {
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
              onTouchEnd={() => {
                if (connectionStart) {
                  onConnection(connectionStart, output.id);
                }

                connectionStart = null;
              }}
            />
          ))}
        </div>
        {Object.values(circuit.gates).map((gate) => (
          <GateNode
            key={gate.id}
            gate={gate}
            connections={circuit.connections}
            onConnectionMade={onConnection}
            onRemove={() => forceUpdate()}
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

                customGates.push({
                  name: nameInput.value,
                  classPointer: gateClass,
                  id: availableGateId++,
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
            <button
              className="tools-gate"
              key={gate.name}
              style={{ background: `#${gate.classPointer.color}` }}
              onClick={(e) => {
                circuit.addGate(gate.classPointer, 50, 20);
                forceUpdate();
              }}
            >
              {gate.name}
            </button>
          ))}
          {customGates.map((gate) => (
            <button
              className="tools-gate"
              key={gate.name}
              style={{ background: `#${gate.classPointer.color}` }}
              onClick={(e) => {
                circuit.addGate(gate.classPointer, 50, 20);
                forceUpdate();
              }}
            >
              {gate.name}
            </button>
          ))}
        </div>
      </div>
      <div className="state-manager">
        <br />
        <button
          onClick={() => {
            circuit = new EmptyCurcuit();
            forceUpdate();
          }}
        >
          Reset Current Curcuit
        </button>
        <button
          onClick={() => {
            localStorage.removeItem(LOCALSTORAGE_KEY);
            window.location.reload();
          }}
        >
          Reset Whole State
        </button>
        <br />
        (buggy atm):
        <button
          onClick={() => {
            saveAppState();
          }}
        >
          Save State
        </button>
        <button
          onClick={() => {
            loadAppState();
            forceUpdate();
          }}
        >
          Load State
        </button>
      </div>
    </div>
  );
}

const loadAppState = () => {
  try {
    const json = localStorage.getItem(LOCALSTORAGE_KEY);
    if (json) {
      const data = JSON.parse(json);
      const gates = data.customGates.map((v) => JSON.parse(v));
      for (const args of gates) {
        const gateClass = createCircuit(
          args.name,
          args.inputs,
          args.outputs,
          args.gates.map((g) => {
            const constructorClass = availableGates
              .concat(customGates)
              .find(
                (gateConstructor) =>
                  gateConstructor.classPointer.staticName === g.constructorName
              );
            if (constructorClass) {
              g.constructorClass = constructorClass.classPointer;
            }
            return g;
          }),
          args.connections
        );
        customGates.push({
          name: args.name,
          classPointer: gateClass,
          id: availableGateId++,
        });
      }

      circuit.fromJS(data.circuit);
    }
  } catch (e) {
    console.log(e);
    // localStorage.removeItem(LOCALSTORAGE_KEY);
  }
};

const saveAppStateDebounced = debounce(saveAppState, 300);

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
let availableGateId = 1;
const availableGates = [
  { classPointer: AND_Gate, name: "AND", id: availableGateId++ },
  { classPointer: NOT_Gate, name: "NOT", id: availableGateId++ },
];
const customGates = [];

export default App;
