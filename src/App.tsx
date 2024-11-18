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
// - Change the block to primary color
// - Add api loading indicator
// - Add revocall header

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
    </ReactFlow>
  );
};

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
