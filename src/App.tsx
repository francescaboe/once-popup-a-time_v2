import React from 'react';
import { useTranslation } from 'react-i18next';
import { STORY } from 'utils/constants';
import useKeyPress from 'hooks/useKeyPress';
import useSwipe from 'hooks/useSwipe';

function App() {
  const { t } = useTranslation();
  const [storyIndex, setStoryIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handlePrevClick = () => {
    setStoryIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNextClick = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setStoryIndex((prev) => (prev < STORY.length - 1 ? prev + 1 : 0));
      setIsFlipped(false);
    }, 500);
  };

  useKeyPress('ArrowLeft', handlePrevClick);

  useKeyPress('ArrowRight', handleNextClick);

  const swipeHandlers = useSwipe(handleNextClick, handlePrevClick);

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black"
      {...swipeHandlers}
    >
      <div className="book-container">
        <div className="book">
          {storyIndex === 0 ? (
            <>
              <div
                className={`${isFlipped ? 'flipped' : ''} page flex flex-col items-center justify-center gap-2 bg-gradient-to-l from-amber-900 to-amber-950 w-[250px] h-[350px]`}
              />
              <div className=" page flex flex-col items-center justify-center gap-2 bg-gradient-to-l from-amber-900 to-amber-950 w-[250px] h-[350px]">
                <h1 className="text-center font-bold font-gothic text-4xl">{t(STORY[0].title)}</h1>
                <p className="p-2 text-sm text-center">
                  {('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
                  STORY[0].content_touchscreen
                    ? t(STORY[0].content_touchscreen)
                    : t(STORY[0].content)}
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                className={`${isFlipped ? 'flipped' : ''} page flex flex-col items-center p-4 bg-amber-100 shadow-lg max-w-md md:max-w-lg text-amber-950 relative w-[237px] h-[339px] mt-[5px]`}
              />
              <div
                className={`page flex flex-col items-center p-4 bg-amber-100 shadow-lg max-w-md md:max-w-lg text-amber-950 relative overflow-hidden w-[237px] h-[339px] mt-[5px]`}
              >
                {/* Gradient overlay top */}
                <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-amber-200 to-transparent"></div>
                <div className=" text-center flex flex-col items-center justify-evenly h-full">
                  <h2 className="text-2xl font-bold font-gothic mt-4 mb-2">
                    {t(STORY[storyIndex].title)}
                  </h2>
                  <div className="h-10 border-8 border-amber-200 bg-amber-300 shadow-lg rounded-sm flex items-center justify-center text-gray-400 mb-2 transform hover:scale-150 transition-transform duration-300">
                    Space for picture!
                  </div>
                  <p className="text-base flex items-center mt-4 font-fable">
                    {('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
                    STORY[storyIndex].content_touchscreen
                      ? t(STORY[storyIndex].content_touchscreen)
                      : t(STORY[storyIndex].content)}
                  </p>
                </div>
                {/* Gradient overlay bottom */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-amber-200 to-transparent"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
