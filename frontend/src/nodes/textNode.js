
import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

function extractVars(text) {
  const seen = new Set();
  const result = [];
  let m;
  VAR_REGEX.lastIndex = 0;
  while ((m = VAR_REGEX.exec(text)) !== null) {
    if (!seen.has(m[1])) { seen.add(m[1]); result.push(m[1]); }
  }
  return result;
}

const color = '#f38ba8';

export const TextNode = ({ id, data }) => {
  const [text, setText]           = useState(data?.text || '{{input}}');
  const [nodeWidth, setNodeWidth]   = useState(240);
  const textareaRef               = useRef(null);

  const variables = extractVars(text);

  useEffect(() => {
  const el = textareaRef.current;
  if (!el) return;

  el.style.height = 'auto';
  const contentH = el.scrollHeight;
  el.style.height = contentH + 'px';
  const lines = text.split('\n');
  const longestLine = Math.max(...lines.map(l => l.length), 20);
  const newW = Math.min(700, Math.max(240, longestLine * 8));
  setNodeWidth(newW);

}, [text]);
  const HANDLE_SPACING = 28;
  const HANDLE_START   = 16;

  return (
    <div style={{
      width: nodeWidth,
      background: '#1e1e2e',
      border: '1px solid #313244',
      borderLeft: `4px solid ${color}`,
      borderRadius: 12,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: '#cdd6f4',
      boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
      position: 'relative',
      overflow: 'visible',
    }}>

   
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 14px',
        background: `linear-gradient(135deg, ${color}30, ${color}10)`,
        borderBottom: '1px solid #313244',
        borderRadius: '8px 8px 0 0',
      }}>
        <span style={{ fontSize: 16 }}>📝</span>
        <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: 0.4 }}>Text</span>
      </div>

      {variables.length > 0 && (
        <div style={{
          position: 'relative',
          height: HANDLE_START + variables.length * HANDLE_SPACING,
          borderBottom: '1px solid #313244',
        }}>
          {variables.map((varName, i) => (
            <div key={varName}>
              <Handle
                type="target"
                position={Position.Left}
                id={`${id}-${varName}`}
                style={{
                  position: 'absolute',
                  top: HANDLE_START + i * HANDLE_SPACING,
                  left: -8,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: color,
                  border: '2px solid #11111b',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                }}
              />
              <span style={{
                position: 'absolute',
                left: 14,
                top: HANDLE_START + i * HANDLE_SPACING - 8,
                fontSize: 10,
                color: '#a6adc8',
                pointerEvents: 'none',
                userSelect: 'none',
                lineHeight: '16px',
              }}>
                {varName}
              </span>
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: '10px 14px 12px' }}>
        <label style={{
          display: 'block',
          fontSize: 11,
          fontWeight: 600,
          color: '#a6adc8',
          marginBottom: 4,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          Text
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: '#181825',
            border: '1px solid #313244',
            borderRadius: 6,
            color: '#cdd6f4',
            padding: '5px 8px',
            fontSize: 12,
            outline: 'none',
            resize: 'none',
            overflow: 'hidden',
            fontFamily: 'inherit',
            lineHeight: 1.6,
            whiteSpace: 'pre',
wordBreak: 'keep-all',
overflowWrap: 'normal',
          }}
        />

        {variables.length > 0 && (
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {variables.map((v) => (
              <span key={v} style={{
                fontSize: 10,
                padding: '2px 7px',
                background: `${color}22`,
                border: `1px solid ${color}66`,
                borderRadius: 4,
                color: color,
              }}>
                {'{{' + v + '}}'}
              </span>
            ))}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          right: -8,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: color,
          border: '2px solid #11111b',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      />
    </div>
  );
};