import { useCallback } from "react";
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type OnConnect,
} from "@xyflow/react";
import { FiFile } from "react-icons/fi";

import "@xyflow/react/dist/base.css";

import TurboNode, { type TurboNodeData } from "./TurboNode.tsx";
import TurboEdge from "./TurboEdge.tsx";
import FunctionIcon from "./FunctionIcon.tsx";
import { LabeledGroupNode } from "./components/labeled-group-node";

const initialNodes: Node<TurboNodeData>[] = [
  {
    id: "0",
    position: { x: 0, y: 0 },
    data: {
      icon: <FunctionIcon />,
      title: "Call Initialized",
      subline: "api.ts",
      nodeLR: true,
    },
    type: "turbo",
  },
  {
    id: "1",
    position: { x: 500, y: 0 },
    data: {
      icon: <FunctionIcon />,
      title: "FAQ",
      subline: "api.ts",
      nodeLB: true,
    },
    type: "turbo",
  },
  {
    id: "group_1",
    position: { x: 200, y: 100 },
    data: { label: "Card Registration" },
    width: 500,
    height: 800,
    type: "group",
  },
  {
    id: "2",
    position: { x: 100, y: 50 },
    data: {
      icon: <FunctionIcon />,
      title: "Requesting Card Registration",
      subline: "apiContents",
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "3",
    position: { x: 100, y: 150 },
    data: {
      icon: <FunctionIcon />,
      title: "Request Name",
      subline: "sdk.ts",
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "4",
    position: { x: 100, y: 250 },
    data: {
      icon: <FunctionIcon />,
      title: "Request IC No.",
      subline: "sdkContents",
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "5",
    position: { x: 100, y: 350 },
    data: {
      icon: <FunctionIcon />,
      title: "Request Employment Status",
      subline: "api, sdk",
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "6",
    position: { x: 100, y: 450 },
    data: { icon: <FiFile />, title: "Request Annual Income", nodeTB: true },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "7",
    position: { x: 100, y: 550 },
    data: { icon: <FiFile />, title: "Confirming Application", nodeTB: true },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "8",
    position: { x: 100, y: 650 },
    data: { icon: <FiFile />, title: "Application Submitted", nodeTB: true },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "9",
    position: { x: 750, y: 800 },
    data: { icon: <FiFile />, title: "Call Ended", nodeLR: true },
    type: "turbo",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e0-1",
    source: "0",
    target: "1",
  },
  {
    id: "e0-2", // FAQ -> Call Ended
    source: "0",
    target: "2",
    animated: true,
  },
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
  },
  {
    id: "e1-9", // FAQ -> Call Ended
    source: "1",
    target: "9",
    animated: true,
  },
];

const nodeTypes = {
  turbo: TurboNode,
  group: LabeledGroupNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

export default Flow;
