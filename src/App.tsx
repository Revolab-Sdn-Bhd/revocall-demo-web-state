import { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type OnConnect,
  type Node,
} from "@xyflow/react";
import {
  nodeTypes,
  edgeTypes,
  defaultEdgeOptions,
  initialNodes,
  initialEdges,
} from "./graph.tsx";
import { type TurboNodeData } from "./TurboNode.tsx";
import { useChannel, ChannelProvider } from "ably/react";

import "@xyflow/react/dist/base.css";

const channelName = "test";
const completed = new Set<number>();

// TODO:
// - Add api loading indicator

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { channel } = useChannel(channelName, (event) => {
    // Handle incoming conversations state messages
    if (event.name === "state") {
      const { event: type, data } = event.data;
      const [id, state] = type.split(" - ");

      console.log(`Received state message: ${type} - ${JSON.stringify(data)}`);

      processState(id, data);
    }

    if (event.name === "process") {
    }
  });

  const processState = (id: string, data: Record<string, unknown>) => {
    const idx = nodes.findIndex((node) => {
      if (node.id === id) return true;
    });

    // If the node is not found, return
    if (idx === -1) return;

    // Update the node
    setNodes((nodes) => {
      const newNodes = [...nodes];

      completed.forEach((completedIdx) => {
        const node = deepCloneNode(newNodes[completedIdx]);
        node.data.status = "completed";
        newNodes[completedIdx] = node;
      });

      const current_node = deepCloneNode(newNodes[idx]);
      current_node.data.status = "current";

      if (current_node.data.slot) {
        const slotValues: string[] = [];

        current_node.data.slot.forEach((slot) => {
          console.log(`Slot[${slot}]: ${data[slot]}`);
          slotValues.push(data[slot]?.toString() ?? "");
        });

        current_node.data.subline = slotValues.join(", ");
      }
      newNodes[idx] = current_node;

      return newNodes;
    });

    completed.add(idx);
  };

  const handleProcess = (id: string, data: Record<string, unknown>) => {}

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  const deepCloneNode = (node: Node<TurboNodeData>) => {
    return {
      ...node,
      data: { ...node.data },
    };
  };

  return (
    <ReactFlow
      fitView
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Controls showInteractive={false} />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="-5 -5 10 10"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>
      {header()}
    </ReactFlow>
  );
};

function header() {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src="./logo_with_text.png"
          alt="revocall_logo"
          style={{ height: "75px" }}
        />
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "10px",
            marginLeft: "20px",
            fontWeight: "bold",
          }}
        >
          Card Loss Demo
        </h1>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ChannelProvider
      channelName={channelName}
      options={{ params: { rewind: "0" } }}
    >
      <Flow />
    </ChannelProvider>
  );
}
