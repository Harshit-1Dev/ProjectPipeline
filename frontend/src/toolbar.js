import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {/* Original 4 nodes */}
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />

        {/* 5 new nodes using BaseNode abstraction */}
        <DraggableNode type='apiCall' label='API Call' />
        <DraggableNode type='conditional' label='Conditional' />
        <DraggableNode type='transform' label='Transform' />
        <DraggableNode type='note' label='Note' />
        <DraggableNode type='vectorStore' label='Vector Store' />
      </div>
    </div>
  );
};