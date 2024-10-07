import React from 'react';

/**
 * Handles the end of a touch event and determines if a left or right swipe gesture has occurred.
 *
 * @param onSwipeLeft - Callback function to be called when a left swipe gesture is detected.
 * @param onSwipeRight - Callback function to be called when a right swipe gesture is detected.
 */
const useSwipe = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  // State to store the initial touch position
  const [touchStart, setTouchStart] = React.useState(0);
  // State to store the final touch position
  const [touchEnd, setTouchEnd] = React.useState(0);

  // Minimum distance required to be considered a swipe
  const minSwipeDistance = 50;

  // Handler for the touch start event
  const onTouchStart = (e: React.TouchEvent) => {
    // Reset the touch end position
    setTouchEnd(0);
    // Store the initial touch position
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handler for the touch move event
  const onTouchMove = (e: React.TouchEvent) => {
    // Update the touch end position as the finger moves
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handler for the touch end event
  const onTouchEnd = () => {
    // If either touchStart or touchEnd is not set, exit the function
    if (!touchStart || !touchEnd) return;

    // Calculate the distance moved
    const distance = touchStart - touchEnd;

    // Check if the swipe distance exceeds the minimum threshold
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // If it's a left swipe, call the onSwipeLeft callback
    if (isLeftSwipe) {
      onSwipeLeft();
    }

    // If it's a right swipe, call the onSwipeRight callback
    if (isRightSwipe) {
      onSwipeRight();
    }
  };

  // Return the touch event handlers to be used by the component
  return { onTouchStart, onTouchMove, onTouchEnd };
};

export default useSwipe;
