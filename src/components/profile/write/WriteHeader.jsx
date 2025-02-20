'use client';

export default function WriteHeader({ loading, onSubmit }) {
  const handlePublish = async (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="flex items-center justify-between mb-6 pb-6 border-b">
      <h1 className="text-2xl font-semibold text-gray-900">
        New Blog Post
      </h1>
      
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handlePublish}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#805aed] border border-transparent rounded-md shadow-sm hover:bg-[#6c4ac7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#805aed] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Publishing...
            </>
          ) : (
            'Publish'
          )}
        </button>
      </div>
    </div>
  );
} 