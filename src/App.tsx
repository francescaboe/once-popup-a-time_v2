import React from 'react';
import { useTranslation } from 'react-i18next';
import { STORY } from 'utils/constants';
import useKeyPress from 'hooks/useKeyPress';
import useSwipe from './hooks/useSwipe';

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

  const swipeHandlers = useSwipe(handleNextClick, handlePrevClick);

  return (
    <main className="min-h-screen flex items-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black">
      <div
        className="container mx-auto flex flex-col items-center justify-center p-4 bg-amber-100 shadow-lg max-w-md md:max-w-lg text-amber-950 relative overflow-hidden"
        {...swipeHandlers}
      >
        {/* Gradient overlay top */}
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-amber-200 to-transparent"></div>
        <div className=" text-center flex flex-col items-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-gothic mt-4 mb-2">
            {t(STORY[storyIndex].title)}
          </h2>
          <div className="w-80 h-64 border-8 border-amber-200 bg-amber-300 shadow-lg rounded-sm flex items-center justify-center text-gray-400 mb-2">
            Space for picture!
          </div>
          <p className="text-base md:text-lg min-h-32 md:min-h-44 md:w-3/4 mt-4 overflow-y-auto font-fable">
            {('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
            STORY[storyIndex].content_touchscreen
              ? t(STORY[storyIndex].content_touchscreen)
              : t(STORY[storyIndex].content)}
          </p>
        </div>
        {/* Gradient overlay bottom */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-amber-200 to-transparent"></div>
      </div>
    </main>
  );
}

export default App;
