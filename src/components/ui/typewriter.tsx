
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterProps {
  texts: string[];
  className?: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  cursor?: boolean;
}

const Typewriter = ({
  texts,
  className,
  speed = 70,
  delay = 2000,
  loop = true,
  cursor = true,
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    let timeout: NodeJS.Timeout;

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    const currentText = texts[currentIndex];
    
    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        
        if (displayText.length <= 1) {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => {
            return loop || prevIndex < texts.length - 1 
              ? (prevIndex + 1) % texts.length 
              : prevIndex;
          });
        }
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        
        if (displayText.length === currentText.length) {
          setIsWaiting(true);
        }
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [texts, displayText, currentIndex, isDeleting, isWaiting, speed, delay, loop]);

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      {cursor && <span className="animate-pulse-scale ml-0.5 font-normal">|</span>}
    </span>
  );
};

export default Typewriter;
