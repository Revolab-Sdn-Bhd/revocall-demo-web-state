import { type Node, type Edge } from "@xyflow/react";
import { FiFile } from "react-icons/fi";
import {
  FaQuestionCircle,
  FaBirthdayCake,
  FaRegCreditCard,
} from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbLock } from "react-icons/tb";
import { MdPermIdentity, MdCallEnd } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdCloudUpload } from "react-icons/io";
import TurboNode, { type TurboNodeData } from "./TurboNode.tsx";
import TurboEdge from "./TurboEdge.tsx";
import { LabeledGroupNode } from "./components/labeled-group-node";
import { AnnotationNode } from "@/components/annotation-node";

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
      slot: ["question"],
      nodeLB: true,
    },
    type: "turbo",
  },
  {
    id: "group_1",
    position: { x: 200, y: 100 },
    data: { label: "Card Loss Application" },
    width: 500,
    height: 900,
    type: "group",
  },
  {
    id: "2",
    position: { x: 100, y: 50 },
    data: {
      icon: <MdPermIdentity />,
      title: "Collect IC Number",
      slot: ["ic_number"],
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
      icon: <FaBirthdayCake />,
      title: "Collect Date of Birth",
      slot: ["dob"],
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
      icon: <AiOutlineTransaction />,
      title: "Collect Last Transaction",
      slot: ["last_transaction_amount", "last_transaction_merchant"],
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
      icon: <FaRegCreditCard />,
      title: "Confirm Lost Card",
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
      icon: <TbLock />,
      title: "Confirm Block Card",
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
      title: "New Card Registration",
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
      icon: <MdPermIdentity />,
      title: "Collect Postal Code",
      slot: ["postal_code"],
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "9",
    position: { x: 100, y: 750 },
    data: {
      icon: <IoMdCloudUpload />,
      title: "Submit New Card",
      nodeTB: true,
    },
    type: "turbo",
    parentId: "group_1",
    extent: "parent",
  },
  {
    id: "10",
    position: { x: 750, y: 900 },
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
    id: "e9-10",
    source: "9",
    target: "10",
  },
  {
    id: "e1-10", // FAQ -> Call Ended
    source: "1",
    target: "10",
    animated: true,
  },
];

export const nodeTypes = {
  turbo: TurboNode,
  group: LabeledGroupNode,
  annotationNode: AnnotationNode,
};

export const edgeTypes = {
  turbo: TurboEdge,
};

export const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};
