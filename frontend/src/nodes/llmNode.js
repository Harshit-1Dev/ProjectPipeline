// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="LLM"
    icon="🤖"
    color="#cba6f7"
    inputs={[
      { id: 'system', label: 'system' },
      { id: 'prompt', label: 'prompt' },
    ]}
    outputs={[{ id: 'response', label: 'response' }]}
    fields={[
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: data?.model || 'gpt-4o',
        options: ['gpt-4o', 'gpt-4o-mini', 'claude-3-5-sonnet', 'claude-3-haiku', 'gemini-1.5-pro'],
      },
    ]}
  />
);
