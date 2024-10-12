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

  // Set up swipe navigation
  const swipeHandlers = useSwipe(handleNextClick, handlePrevClick);

  // Check if the device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Function to render a page with given content and additional classes
  const renderPage = (content: React.ReactNode, additionalClasses = '') => (
    <div className={`page flex flex-col items-center ${additionalClasses}`}>{content}</div>
  );

  // Function to render the content of a story page
  const renderContent = (index: number) => {
    const story = STORY[index];
    const content =
      isTouchDevice && story.content_touchscreen ? t(story.content_touchscreen) : t(story.content);

    return (
      <>
        <h2
          className={`${index === 0 ? 'text-4xl' : 'text-2xl'} font-bold font-gothic transition-opacity duration-500 ${!isFlipped ? 'opacity-100' : 'opacity-0'} ${index === 0 ? '' : 'mt-4 mb-2'}`}
        >
          {t(story.title)}
        </h2>
        {index !== 0 && (
          <div
            className={`transition-transform duration-500 ${!isFlipped ? 'opacity-100' : 'opacity-0'}  h-10 border-8 border-amber-200 bg-amber-300 shadow-lg rounded-sm flex items-center justify-center text-gray-400 mb-2 transform hover:scale-150`}
          >
            Space for picture!
          </div>
        )}
        <p
          className={`${index === 0 ? 'p-2 text-sm' : 'text-base mt-4 font-fable'} text-center ${!isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        >
          {content}
        </p>
      </>
    );
  };

  // Define classes for the page based on whether it's the cover or a content page
  const pageClasses =
    storyIndex === 0
      ? 'justify-center gap-2 bg-gradient-to-l from-amber-900 to-amber-950 w-[250px] h-[350px]'
      : 'p-4 bg-amber-100 shadow-lg max-w-md md:max-w-lg text-amber-950 relative overflow-hidden w-[237px] h-[339px] mt-[5px]';

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black"
      {...swipeHandlers}
    >
      <div className="book-container">
        <div className="book">
          {/* Render the back of the page */}
          {renderPage('', `${isFlipped ? 'flipped' : ''} ${pageClasses}`)}
          {/* Render the front of the page with content */}
          {renderPage(
            <>
              {storyIndex !== 0 && (
                <>
                  {/* Add gradient effects to the top and bottom of the page */}
                  <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-amber-200 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-amber-200 to-transparent"></div>
                </>
              )}
              <div
                className={`${isFlipped ? 'flipped' : ''} text-center flex flex-col items-center justify-evenly h-full`}
              >
                {renderContent(storyIndex)}
              </div>
            </>,
            pageClasses,
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
