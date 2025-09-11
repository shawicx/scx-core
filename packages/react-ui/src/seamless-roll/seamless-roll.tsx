/*
 * @Author: shawicx d35f3153@proton.me
 * @Description:
 */
import React, { useEffect, useRef, useState } from 'react';

import './seamless-roll.css'; // 引入 CSS 文件

interface MarqueeProps {
  children: React.ReactNode;
  duration?: number; // 轮播时间
  gap?: number; // 子元素间的间隙
  autoplay?: boolean; // 是否自动播放
  vertical?: boolean; // 是否为垂直滚动
}

export const SeamlessCarousel: React.FC<MarqueeProps> = ({
  children,
  duration = 5000,
  gap = 10,
  autoplay = true,
  vertical = false,
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  useEffect(() => {
    // 这里可能需要添加一些逻辑来处理 duration, isPlaying, vertical 的变化
    // 目前这个 effect 是空的，需要根据实际需求添加实现
  }, [duration, isPlaying, vertical]);

  useEffect(() => {
    const handleMouseEnter = () => setIsPlaying(false);
    const handleMouseLeave = () => setIsPlaying(autoplay);

    marqueeRef.current?.addEventListener('mouseenter', handleMouseEnter);
    marqueeRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      marqueeRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      marqueeRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [autoplay]);

  return (
    <div
      ref={marqueeRef}
      className={`marquee ${vertical ? 'vertical' : ''}`}
      style={{
        // transform: `translate${vertical ? 'Y' : 'X'}(${-scrollPosition}px)`,
        gap,
      }}
    >
      {children}
    </div>
  );
};
