import { type Node, type Edge } from "@xyflow/react";
import { FiFile } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";
import {
  MdOutlineAppRegistration,
  MdOutlineDriveFileRenameOutline,
  MdPermIdentity,
  MdOutlineWork,
  MdCallEnd,
} from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoMdCloudUpload } from "react-icons/io";
import TurboNode, { type TurboNodeData } from "./TurboNode.tsx";
import TurboEdge from "./TurboEdge.tsx";
import { LabeledGroupNode } from "./components/labeled-group-node";

export const initialNodes: Node<TurboNodeData>[] = [
  {
    id: "0",
    position: { x: 0, y: 0 },
    data: {
      icon: <BiSolidPhoneCall />,
      title: "Call Initialized",
      nodeLR: true,
    },
    type: "turbo",
  },
  {
    id: "1",
    position: { x: 500, y: 0 },
    data: {
      icon: <FaQuestionCircle />,
      title: "FAQ",
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
      icon: <MdOutlineAppRegistration />,
      title: "Requesting Card Registration",
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
      icon: <MdOutlineDriveFileRenameOutline />,
      title: "Request Name",
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
      icon: <MdPermIdentity />,
      title: "Request IC No.",
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
      icon: <MdOutlineWork />,
      title: "Request Employment Status",
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "6",
    position: { x: 100, y: 450 },
    data: {
      icon: <RiMoneyDollarCircleFill />,
      title: "Request Annual Income",
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "7",
    position: { x: 100, y: 550 },
    data: {
      icon: <FiFile />,
      title: "Confirming Application",
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "8",
    position: { x: 100, y: 650 },
    data: {
      icon: <IoMdCloudUpload />,
      title: "Application Submitted",
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "9",
    position: { x: 750, y: 800 },
    data: {
      icon: <MdCallEnd />,
      title: "Call Ended",
      nodeLR: true,
    },
    type: "turbo",
  },
];

export const initialEdges: Edge[] = [
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

export const nodeTypes = {
  turbo: TurboNode,
  group: LabeledGroupNode,
};

export const edgeTypes = {
  turbo: TurboEdge,
};

export const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};
