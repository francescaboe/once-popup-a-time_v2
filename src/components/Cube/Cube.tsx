import React from 'react';
function Cube({ children }: { children: React.ReactNode }) {
  return (
    <div className="container [perspective:500px] w-[200px] h-[200px] m-32">
      <div className="cube w-[200px] h-[200px] [transform-style:preserve-3d] [transform:rotate3d(1,-1,0,20deg)]">
        <div className="face w-[200px] h-[200px] bg-amber-200 border-2 border-green-900 absolute [transform:translateY(100px)_rotateX(-90deg)] bottom"></div>
        <div className="face w-[200px] h-[200px] bg-amber-300 border-2 border-green-900 absolute [transform:translateX(100px)_rotateY(90deg)] right"></div>
        <div className=" face w-[200px] h-[200px] bg-amber-400 border-2 border-green-900 absolute [transform:translateZ(100px)] front">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Cube;
