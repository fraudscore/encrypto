import React from 'react';

function Alert({ title, description, status }: any) {
  const isError = status === 400;
  const colorClasses = isError ? 'border-red-500 bg-red-50 text-red-800 text-red-700' : 'border-green-500 bg-green-50 text-green-800 text-green-700';

  return (
    <div role="alert" className={`rounded border-s-4 p-4 ${colorClasses.split(' ').slice(0, 2).join(' ')}`}>
      <div className={`flex items-center gap-2 ${colorClasses.split(' ').slice(2, 4).join(' ')}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>

        <strong className="block font-medium"> {title} </strong>
      </div>

      <p className={`mt-2 text-sm ${colorClasses.split(' ').slice(4).join(' ')}`}>
        {description}
      </p>
    </div>
  );
}

export default Alert;
