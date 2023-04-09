import React, { ReactElement, useEffect, useState } from 'react';

interface Props {
  children: ReactElement[];
  width: number;
  onSlide: number;
  gap: number;
}

function CustomSlide({ children, width, onSlide, gap }: Props) {
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const [preWidth, setPreWidth] = useState<number>(0);

  useEffect(() => {
    setPreWidth(currentWidth);
    const nextWidth = (onSlide - 1) * (width + gap);
    setCurrentWidth(nextWidth);
  }, [onSlide]);

  return (
    <div style={{ overflow: 'hidden', width: width }}>
      <div
        style={{
          width: width,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          gap: gap,
          transform: `translate(-${currentWidth}px, 0px)`,
          transition: `${
            (Math.abs(currentWidth - preWidth) / (width + gap)) * 0.35
          }s all ease-in-out`,
        }}
      >
        {children.map((item, index) => {
          return (
            <div key={index}>
              <div style={{ width: width }}>{React.cloneElement(item)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomSlide;
