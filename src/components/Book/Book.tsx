import React from 'react';
import { useTranslation } from 'react-i18next';
import { STORY } from 'utils/constants';

const Book = () => {
  const { t } = useTranslation();
  return (
    <div className="book-container">
      <div className="book">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-center font-bold font-gothic text-4xl">{t(STORY[0].title)}</h1>
          <p className="p-2 text-sm text-center">
            {('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
            STORY[0].content_touchscreen
              ? t(STORY[0].content_touchscreen)
              : t(STORY[0].content)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;
