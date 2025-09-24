'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const JsonValue = ({ value }: { value: any }) => {
  if (value === null) {
    return <span className="text-rose-500 dark:text-rose-400">null</span>;
  }

  switch (typeof value) {
    case 'string':
      return <span className="text-emerald-600 dark:text-emerald-400">"{value}"</span>;
    case 'number':
      return <span className="text-cyan-600 dark:text-cyan-400">{value}</span>;
    case 'boolean':
      return <span className="text-amber-600 dark:text-amber-400">{String(value)}</span>;
    case 'object':
      if (Array.isArray(value)) {
        return <JsonArray data={value} />;
      }
      return <JsonObject data={value} />;
    default:
      return <span className="text-slate-500">{String(value)}</span>;
  }
};

const JsonObject = ({ data }: { data: Record<string, any> }) => {
  const [isOpen, setIsOpen] = useState(true);
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return <span className="text-slate-500">{`{}`}</span>;
  }

  return (
    <div className="relative">
      <span onClick={() => setIsOpen(!isOpen)} className="cursor-pointer select-none flex items-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
        {isOpen ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />} {'{'}
      </span>
      {isOpen && (
        <div className="pl-5 border-l border-slate-300 dark:border-slate-700 ml-2">
          {entries.map(([key, value], index) => (
            <div key={key} className="flex items-start">
              <span className="text-indigo-500 dark:text-indigo-400 flex-shrink-0">"{key}"</span>
              <span className="text-slate-500 mx-1">:</span>
              <div className="flex-grow">
                <JsonValue value={value} />
              </div>
              {index < entries.length - 1 && <span className="text-slate-500">,</span>}
            </div>
          ))}
        </div>
      )}
      <span className="text-slate-500">{'}'}</span>
    </div>
  );
};

const JsonArray = ({ data }: { data: any[] }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (data.length === 0) {
    return <span className="text-slate-500">[]</span>;
  }

  return (
    <div className="relative">
       <span onClick={() => setIsOpen(!isOpen)} className="cursor-pointer select-none flex items-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
        {isOpen ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
        <span>Array(<span className="text-cyan-600 dark:text-cyan-400">{data.length}</span>)</span>
      </span>
      {isOpen && (
        <div className="pl-5 border-l border-slate-300 dark:border-slate-700 ml-2">
          {data.map((value, index) => (
            <div key={index} className="flex items-start">
               <span className="text-slate-500 mr-2 text-right w-6 flex-shrink-0">{index}:</span>
               <div className="flex-grow">
                <JsonValue value={value} />
              </div>
              {index < data.length - 1 && <span className="text-slate-500">,</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const JsonViewer = ({ data }: { data: any }) => {
  return (
    <div className="font-mono text-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg text-left overflow-x-auto border border-slate-200 dark:border-slate-800 shadow-inner">
      <JsonValue value={data} />
    </div>
  );
};

export default JsonViewer;
