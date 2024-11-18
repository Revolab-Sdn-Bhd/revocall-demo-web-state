import React, { memo, type ReactNode } from "react";
import { MdFileDownloadDone } from "react-icons/md";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type TurboNodeData = {
  title?: string;
  icon?: ReactNode;
  label?: string;
  subline?: string;
  status?: string;
  nodeLR?: boolean;
  nodeRL?: boolean;
  nodeTB?: boolean;
  nodeTL?: boolean;
  nodeLB?: boolean;
  nodeRB?: boolean;
  nodeBR?: boolean;
  nodeTR?: boolean;
  // For annotation nodes
  level?: number;
  arrow?: string;
  arrowStyle?: {
    right: number;
    bottom: number;
    transform: string;
  };
};

const incomplete = {
  color: "#AAAAAA",
  backgroundColor: "#E5E5E5",
};

const current = {
  color: "#000000",
  backgroundColor: "#F9F9F9",
};

const completed = {
  color: undefined,
  backgroundColor: "#1C2740",
};

const TurboNode: React.FC<NodeProps<Node<TurboNodeData>>> = ({ data }) => {
  const nodeStyle = { minWidth: "300px", border: "" }; // Set your desired minimum width

  let colors: { color: string | undefined; backgroundColor: string };

  if (data.status === "current") {
    colors = current;
  } else if (data.status === "completed") {
    colors = completed;
  } else {
    colors = incomplete;
    data.status = "incomplete";
    nodeStyle.border = "2px solid #AAAAAA";
  }

  return (
    <>
      {data.status === "completed" && (
        <div className="cloud gradient">
          <div>
            <MdFileDownloadDone />
          </div>
        </div>
      )}
      <div
        className={`wrapper ${data.status !== "incomplete" ? "gradient" : ""} ${
          data.status
        }`}
        style={nodeStyle}
      >
        <div className="inner" style={colors}>
          <div className="body">
            {data.icon && <div className="icon">{data.icon}</div>}
            <div>
              <div className="title">{data.title}</div>
              {data.subline && <div className="subline">{data.subline}</div>}
            </div>
          </div>
          {data.nodeLR && (
            <div>
              <Handle type="target" position={Position.Left} />
              <Handle type="source" position={Position.Right} />
            </div>
          )}
          {data.nodeRL && (
            <div>
              <Handle type="target" position={Position.Right} />
              <Handle type="source" position={Position.Left} />
            </div>
          )}
          {data.nodeTB && (
            <div>
              <Handle type="target" position={Position.Top} />
              <Handle type="source" position={Position.Bottom} />
            </div>
          )}
          {data.nodeTL && (
            <div>
              <Handle type="target" position={Position.Top} />
              <Handle type="source" position={Position.Left} />
            </div>
          )}
          {data.nodeLB && (
            <div>
              <Handle type="target" position={Position.Left} />
              <Handle type="source" position={Position.Bottom} />
            </div>
          )}
          {data.nodeRB && (
            <div>
              <Handle type="target" position={Position.Right} />
              <Handle type="source" position={Position.Bottom} />
            </div>
          )}
          {data.nodeBR && (
            <div>
              <Handle type="target" position={Position.Bottom} />
              <Handle type="source" position={Position.Right} />
            </div>
          )}
          {data.nodeTR && (
            <div>
              <Handle type="target" position={Position.Top} />
              <Handle type="source" position={Position.Right} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(TurboNode);
