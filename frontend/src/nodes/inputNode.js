
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => (
  <BaseNode
    id={id}
    label="Input"
    icon="📥"
    color="#89b4fa"
    inputs={[]}
    outputs={[{ id: 'value', label: 'value' }]}
    fields={[
      {
        key: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.inputName || id.replace('customInput-', 'input_'),
        placeholder: 'variable_name',
      },
      {
        key: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.inputType || 'Text',
        options: ['Text', 'File'],
      },
    ]}
  />
);
