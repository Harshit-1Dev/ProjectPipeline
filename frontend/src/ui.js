// ui.js
import { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode }      from './nodes/inputNode';
import { LLMNode }        from './nodes/llmNode';
import { OutputNode }     from './nodes/outputNode';
import { TextNode }       from './nodes/textNode';
import {
  ApiCallNode,
  ConditionalNode,
  TransformNode,
  NoteNode,
  VectorStoreNode,
} from './nodes/customNodes';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput:  InputNode,
  llm:          LLMNode,
  customOutput: OutputNode,
  text:         TextNode,
  apiCall:      ApiCallNode,
  conditional:  ConditionalNode,
  transform:    TransformNode,
  note:         NoteNode,
  vectorStore:  VectorStoreNode,
};

const selector = (state) => ({
  nodes:         state.nodes,
  edges:         state.edges,
  getNodeID:     state.getNodeID,
  addNode:       state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect:     state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes, edges, getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    if (event?.dataTransfer?.getData('application/reactflow')) {
      const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const type = appData?.nodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      });
    }
  }, [reactFlowInstance, getNodeID, addNode]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ flex: 1, height: '100%', overflow: 'visible' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        deleteKeyCode="Delete"
        selectionKeyCode="Shift"
        multiSelectionKeyCode="Shift"
        elementsSelectable={true}
        selectNodesOnDrag={false}
        nodeDragThreshold={1}
nodesFocusable={true}
nodesDraggable={true}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#313244"
        />
        <Controls style={{
          background: '#1e1e2e',
          border: '1px solid #313244',
          borderRadius: 8,
        }} />
        <MiniMap
          nodeColor="#6366f1"
          style={{
            background: '#11111b',
            border: '1px solid #313244',
            borderRadius: 8,
          }}
          maskColor="rgba(17,17,27,0.75)"
        />
      </ReactFlow>
    </div>
  );
};