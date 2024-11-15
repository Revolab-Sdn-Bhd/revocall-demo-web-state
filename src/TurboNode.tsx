import React, { memo, type ReactNode } from "react";
import { FiCloud } from "react-icons/fi";

import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";

export type TurboNodeData = {
  title?: string;
  icon?: ReactNode;
  label?: string;
  subline?: string;
  nodeLR?: boolean;
  nodeRL?: boolean;
  nodeTB?: boolean;
  nodeTL?: boolean;
  nodeLB?: boolean;
  nodeRB?: boolean;
  nodeBR?: boolean;
  nodeTR?: boolean;
};

const TurboNode: React.FC<NodeProps<Node<TurboNodeData>>> = ({ data }) => {
  const minWidthStyle = { minWidth: "300px" }; // Set your desired minimum width

  return (
    <>
      <div className="cloud gradient">
        <div>
          <FiCloud />
        </div>
      </div>
      <div className="wrapper gradient" style={minWidthStyle}>
        <div className="inner">
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
