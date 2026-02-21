import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Output"
    icon="📤"
    color="#a6e3a1"
    inputs={[{ id: 'value', label: 'value' }]}
    outputs={[]}
    fields={[
      {
        key: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.outputName || id.replace('customOutput-', 'output_'),
        placeholder: 'output_name',
      },
      {
        key: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.outputType || 'Text',
        options: ['Text', 'File', 'Image'],
      },
    ]}
  />
);
