'use client';

import React from 'react';

const JsonViewer = ({ data }: { data: any }) => {
  const cleanData = (obj: any): any => {
    if (Array.isArray(obj)) {
      const cleanedArray = obj
        .map(v => cleanData(v))
        .filter(v => v !== null);
      return cleanedArray.length > 0 ? cleanedArray : null;
    }
    if (obj !== null && typeof obj === 'object') {
      const newObj: { [key: string]: any } = {};
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (
          value === '정보 없음' ||
          (Array.isArray(value) && value.length === 0)
        ) {
          continue;
        }

        const cleanedValue = cleanData(value);

        if (cleanedValue !== null) {
          newObj[key] = cleanedValue;
        }
      }

      if (Object.keys(newObj).length === 0) {
        return null;
      }
      return newObj;
    }
    return obj === '정보 없음' ? null : obj;
  };

  const cleanedData = cleanData(data);

  return (
    <div className="font-mono text-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-4 rounded-lg text-left overflow-x-auto border border-slate-200 dark:border-slate-800 shadow-inner">
      <pre className="whitespace-pre-wrap break-all">
        {cleanedData && JSON.stringify(cleanedData, null, 2)}
      </pre>
    </div>
  );
};

export default JsonViewer;
