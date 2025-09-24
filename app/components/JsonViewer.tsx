'use client';

import React, { useState } from 'react';

const JsonValue = ({ value }: { value: any }) => {
  if (value === null) {
    return <span className="text-gray-500">null</span>;
  }

  switch (typeof value) {
    case 'string':
      return <span className="text-green-600 dark:text-green-400">"{value}"</span>;
    case 'number':
      return <span className="text-blue-600 dark:text-blue-400">{value}</span>;
    case 'boolean':
      return <span className="text-purple-600 dark:text-purple-400">{String(value)}</span>;
    case 'object':
      if (Array.isArray(value)) {
        return <JsonArray data={value} />;
      }
      return <JsonObject data={value} />;
    default:
      return <span>{String(value)}</span>;
  }
};

const JsonObject = ({ data }: { data: Record<string, any> }) => {
  const [isOpen, setIsOpen] = useState(true);
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return <span>{`{}`}</span>
  }

  return (
    <div>
      <span onClick={() => setIsOpen(!isOpen)} className="cursor-pointer select-none">
        {isOpen ? '▼' : '►'} {'{'}
      </span>
      {isOpen && (
        <div className="pl-4 border-l border-gray-300 dark:border-gray-700 ml-2">
          {entries.map(([key, value], index) => (
            <div key={key}>
              <span className="text-pink-600 dark:text-pink-400">"{key}"</span>: <JsonValue value={value} />
              {index < entries.length - 1 && ','}
            </div>
          ))}
        </div>
      )}
      <span>{'}'}</span>
    </div>
  );
};

const JsonArray = ({ data }: { data: any[] }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (data.length === 0) {
    return <span>[]</span>
  }

  return (
    <div>
      <span onClick={() => setIsOpen(!isOpen)} className="cursor-pointer select-none">
        {isOpen ? '▼' : '►'} [{data.length}]
      </span>
      {isOpen && (
        <div className="pl-4 border-l border-gray-300 dark:border-gray-700 ml-2">
          {data.map((value, index) => (
            <div key={index}>
              <JsonValue value={value} />
              {index < data.length - 1 && ','}
            </div>
          ))}
        </div>
      )}
      <span>]</span>
    </div>
  );
};


const JsonViewer = ({ data }: { data: any }) => {
  return (
    <div className="font-mono text-xs bg-gray-100 dark:bg-zinc-800 p-4 rounded-md text-left overflow-x-auto">
      <JsonValue value={data} />
    </div>
  );
};

export default JsonViewer;
