import React from 'react';
import { useTranslation } from 'react-i18next';
import { STORY } from 'utils/constants';
import useKeyPress from 'hooks/useKeyPress';

function App() {
  const { t } = useTranslation();
  const [storyIndex, setStoryIndex] = React.useState(0);

  const handlePrevClick = () => {
    setStoryIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextClick = () => {
    setStoryIndex((prev) => (prev < STORY.length - 1 ? prev + 1 : 0));
  };

  useKeyPress('ArrowLeft', handlePrevClick);

  useKeyPress('ArrowRight', handleNextClick);

  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          {t(STORY[storyIndex].title)}
        </h2>
        <p className="text-base md:text-lg lg:text-xl h-40 w-3/4 mx-auto overflow-y-auto flex items-center">
          {t(STORY[storyIndex].content)}
        </p>
      </div>
      <div className="w-64 h-64 border-8 border-amber-200 bg-amber-300 shadow-lg rounded-sm flex items-center justify-center text-gray-400 mb-8">
        Space for picture
      </div>
      <div className="flex space-x-4">
        <button
          className="hidden md:block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handlePrevClick}
        >
          {t('prev')}
        </button>
        <button
          className="hidden md:block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleNextClick}
        >
          {t('next')}
        </button>
      </div>
    </main>
  );
}

export default App;
