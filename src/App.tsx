import { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type OnConnect,
} from "@xyflow/react";
import {
  nodeTypes,
  edgeTypes,
  defaultEdgeOptions,
  initialNodes,
  initialEdges,
} from "./graph.tsx";
import { useChannel, ChannelProvider } from "ably/react";

import "@xyflow/react/dist/base.css";

const channelName = "test";
const completed = new Set<number>();

// TODO:
// - Add api loading indicator

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { channel } = useChannel(channelName, (message) => {
    // Handle incoming conversations state messages
    if (message.name === "state") {
      const { event, message: msg } = message.data;
      const [id, state] = event.split(" - ");

      console.log("Received state message", state);

      const idx = nodes.findIndex((node) => {
        if (node.id === id) return true;
      });

      // If the node is not found, return
      if (idx === -1) return;

      // Update the node
      setNodes((nodes) => {
        const newNodes = [...nodes];

        completed.forEach((completedIdx) => {
          newNodes[completedIdx] = {
            ...newNodes[completedIdx],
            data: {
              ...newNodes[completedIdx].data,
              status: "completed",
            },
          };
        });

        newNodes[idx] = {
          ...newNodes[idx],
          data: {
            ...newNodes[idx].data,
            status: "current",
            subline: msg,
          },
        };

        return newNodes;
      });

      completed.add(idx);
    }
  });

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

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
      options={{ params: { rewind: "10" } }}
    >
      <Flow />
    </ChannelProvider>
  );
}
