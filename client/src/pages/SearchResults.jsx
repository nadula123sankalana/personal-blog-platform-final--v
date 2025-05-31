import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchBlogs } from '../services/api';
import { Search } from 'lucide-react';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentQuery = searchParams.get('query') || '';
    setQuery(currentQuery);
    if (currentQuery.trim() === '') {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await searchBlogs(currentQuery);
        setResults(response.data);
        setError('');
      } catch (err) {
        console.error('Error searching blogs:', err);
        setError('Failed to load search results.');
      }
    };
    fetchResults();
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    setSearchParams({ query: query.trim() });
  };

  const handlePostClick = (postId) => {
    navigate(`/blogs/${postId}`);
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-black sm:px-6 sm:py-8">
      <div className="w-full max-w-4xl p-4 bg-gray-800 shadow-lg rounded-xl sm:p-6">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-2 sm:left-3 top-1/2 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 pl-8 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg sm:p-3 sm:pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 p-2 text-white transition-all duration-300 transform bg-red-600 rounded-lg hover:bg-red-700 hover:scale-105"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden text-sm sm:inline sm:text-base">Search</span>
          </button>
        </form>

        <h2 className="mb-4 text-lg font-bold text-white sm:text-xl sm:mb-6">
          Search Results for: "{query}"
        </h2>

        {error && (
          <p className="p-2 mb-3 text-sm text-red-500 bg-red-900 bg-opacity-50 rounded-lg sm:mb-4 sm:text-base sm:p-3">
            {error}
          </p>
        )}

        {results.length > 0 ? (
          <div className="space-y-4 sm:space-y-6 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {results.map((post) => (
              <div
                key={post._id}
                onClick={() => handlePostClick(post._id)}
                className="px-4 py-3 transition-all duration-300 transform bg-gray-800 border border-gray-700 rounded-lg shadow-md cursor-pointer sm:px-6 sm:py-5 hover:shadow-lg hover:scale-105"
              >
                <h4 className="mb-1 text-lg font-semibold text-white sm:text-xl sm:mb-2">
                  {post.title}
                </h4>
                <div
                  className="text-sm leading-relaxed text-gray-300 sm:text-base"
                  dangerouslySetInnerHTML={{
                    __html: post.content.substring(0, 160) + '...',
                  }}
                />
                <p className="mt-2 text-xs text-gray-400 sm:text-sm sm:mt-3">
                  Posted by {post.author?.username || 'Unknown'} on{' '}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-300 sm:text-base">No matching posts found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;