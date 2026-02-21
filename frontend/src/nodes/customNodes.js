
import { BaseNode } from './BaseNode';

export const ApiCallNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="API Call"
    icon="🌐"
    color="#fab387"
    inputs={[
      { id: 'url', label: 'URL' },
      { id: 'body', label: 'body' },
    ]}
    outputs={[
      { id: 'response', label: 'response' },
      { id: 'status', label: 'status' },
    ]}
    fields={[
      {
        key: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: data?.method || 'GET',
        options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      },
      {
        key: 'headers',
        label: 'Headers (JSON)',
        type: 'textarea',
        defaultValue: data?.headers || '{}',
        placeholder: '{"Authorization": "Bearer ..."}',
      },
    ]}
  />
);


export const ConditionalNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Conditional"
    icon="🔀"
    color="#94e2d5"
    inputs={[{ id: 'value', label: 'value' }]}
    outputs={[
      { id: 'true', label: 'true ✓' },
      { id: 'false', label: 'false ✗' },
    ]}
    fields={[
      {
        key: 'operator',
        label: 'Operator',
        type: 'select',
        defaultValue: data?.operator || 'equals',
        options: ['equals', 'not equals', 'contains', 'greater than', 'less than', 'is empty'],
      },
      {
        key: 'compare',
        label: 'Compare Value',
        type: 'text',
        defaultValue: data?.compare || '',
        placeholder: 'value to compare...',
      },
    ]}
  />
);


export const TransformNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Transform"
    icon="⚗️"
    color="#f9e2af"
    inputs={[{ id: 'input', label: 'input' }]}
    outputs={[{ id: 'output', label: 'output' }]}
    fields={[
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: data?.operation || 'JSON.parse',
        options: [
          'JSON.parse',
          'JSON.stringify',
          'toUpperCase',
          'toLowerCase',
          'trim',
          'split by newline',
          'join with comma',
        ],
      },
    ]}
  />
);


export const NoteNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Note"
    icon="🗒️"
    color="#eba0ac"
    inputs={[]}
    outputs={[]}
    minWidth={200}
    fields={[
      {
        key: 'content',
        label: 'Content',
        type: 'textarea',
        defaultValue: data?.content || 'Add a note...',
        placeholder: 'Document your pipeline here...',
      },
    ]}
  />
);

export const VectorStoreNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Vector Store"
    icon="🗄️"
    color="#b4befe"
    inputs={[
      { id: 'query', label: 'query' },
      { id: 'documents', label: 'docs' },
    ]}
    outputs={[{ id: 'results', label: 'results' }]}
    fields={[
      {
        key: 'storeName',
        label: 'Store Name',
        type: 'text',
        defaultValue: data?.storeName || 'my-store',
        placeholder: 'store-name',
      },
      {
        key: 'topK',
        label: 'Top K',
        type: 'number',
        defaultValue: data?.topK || 5,
      },
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: data?.operation || 'search',
        options: ['search', 'upsert', 'delete'],
      },
    ]}
  />
);
