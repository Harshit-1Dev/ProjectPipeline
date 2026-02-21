import { useCallback } from "react";
import { useState } from "react";
import { Handle } from 'reactflow';
import { Position } from 'reactflow';

export const BaseNode=({
    id,
    label,   
    icon = '⚙️',  
    color = '#6366f1', 
    inputs = [], 
    outputs =[],
    fields = [],
    children,
    minimimWidth = 220,
})=>{
    const[values,setValues]=useState(()=>
    Object.fromEntries(fields.map((f)=> [f.key, f.defaultValue ?? '']))
);
const onChange =useCallback((key, value)=>{
    setValues((prev)=>({...prev,[key]:value}));
},[]);

const handleTop=(index,total)=>{
    if (total === 1) 
        return '50%';
    const step = 100/(total+1);
    return `${step * (index + 1)}%`;
};

return(
    <div style={styles.wrapper(color, minimimWidth)}>      
      <div style={styles.header(color)}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={styles.headerLabel}>{label}</span>
      </div>      
      <div style={styles.body}>        
        {inputs.map((inp, i) => (
          <div key={inp.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${inp.id}`}
              style={styles.handle(color, handleTop(i, inputs.length))}
            />
            <span style={styles.handleLabelLeft(handleTop(i, inputs.length))}>
              {inp.label}
            </span>
          </div>
        ))}        
        {outputs.map((out, i) => (
          <div key={out.id}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${out.id}`}
              style={styles.handle(color, handleTop(i, outputs.length))}
            />
            <span style={styles.handleLabelRight(handleTop(i, outputs.length))}>
              {out.label}
            </span>
          </div>
        ))}

        
        {(inputs.length > 0 || outputs.length > 0) && (
          <div style={{ height: Math.max(inputs.length, outputs.length) * 22 }} />
        )}

        
        {fields.map((field) => (
          <FieldRow
            key={field.key}
            field={field}
            value={values[field.key]}
            onChange={(v) => onChange(field.key, v)}
          />
        ))}

        
        {children}
      </div>
    </div>
);
};
function FieldRow({ field, value, onChange }) {
  const base = styles.input;

  return (
    <div style={{ marginBottom: 8 }}>
      <label style={styles.fieldLabel}>{field.label}</label>
      {field.type === 'select' ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} style={base}>
          {field.options?.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          value={value}
          rows={3}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...base, resize: 'vertical' }}
        />
      ) : (
        <input
          type={field.type ?? 'text'}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={base}
        />
      )}
    </div>
  );
}

const styles = {
  wrapper: (color, minimimWidth) => ({
    minimimWidth,
    background: '#1e1e2e',
    border: `1px solid #313244`,
    borderLeft: `4px solid ${color}`,
    borderRadius: 12,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: '#cdd6f4',
    boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
    overflow: 'hidden',
  }),
  header: (color) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '9px 14px',
    background: `linear-gradient(135deg, ${color}30, ${color}10)`,
    borderBottom: '1px solid #313244',
  }),
  headerLabel: {
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 0.4,
    color: '#cdd6f4',
  },
  body: {
    padding: '10px 14px 12px',
    position: 'relative',
  },
  handle: (color, top) => ({
    top,
    transform: 'translateY(-50%)',
    background: color,
    border: '2px solid #11111b',
    width: 12,
    height: 12,
    borderRadius: '50%',
  }),
  handleLabelLeft: (top) => ({
    position: 'absolute',
    left: 18,
    top,
    transform: 'translateY(-50%)',
    fontSize: 10,
    color: '#a6adc8',
    pointerEvents: 'none',
    userSelect: 'none',
  }),
  handleLabelRight: (top) => ({
    position: 'absolute',
    right: 18,
    top,
    transform: 'translateY(-50%)',
    fontSize: 10,
    color: '#a6adc8',
    pointerEvents: 'none',
    userSelect: 'none',
    textAlign: 'right',
  }),
  fieldLabel: {
    display: 'block',
    fontSize: 11,
    fontWeight: 600,
    color: '#a6adc8',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#181825',
    border: '1px solid #313244',
    borderRadius: 6,
    color: '#cdd6f4',
    padding: '5px 8px',
    fontSize: 12,
    outline: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.5,
  },
};
