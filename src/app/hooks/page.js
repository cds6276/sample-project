'use client'; // Only needed if using App Router and placing this in `/app`

import React, { useState, useRef, useEffect } from 'react';

const Tooltip = ({
  children,
  content,
  position = 'top',
  backgroundColor = '#333',
  textColor = '#fff',
  fontSize = '14px',
  padding = '8px 12px',
  borderRadius = '6px',
  delay = 200,
  offset = 10,
  maxWidth = '200px',
  className = '',
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top, left;

      switch (position) {
        case 'top':
          top = -tooltipRect.height - offset;
          left = (containerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = containerRect.height + offset;
          left = (containerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = (containerRect.height - tooltipRect.height) / 2;
          left = -tooltipRect.width - offset;
          break;
        case 'right':
          top = (containerRect.height - tooltipRect.height) / 2;
          left = containerRect.width + offset;
          break;
        default:
          top = -tooltipRect.height - offset;
          left = (containerRect.width - tooltipRect.width) / 2;
      }

      setTooltipStyle({
        top: `${top}px`,
        left: `${left}px`,
      });
    }
  }, [isVisible, position, offset]);

  useEffect(() => {
    return () => {
      // Clean up timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrowStyle = () => {
    const arrowSize = 6;
    const arrowStyles = {
      position: 'absolute',
      width: 0,
      height: 0,
    };

    switch (position) {
      case 'top':
        return {
          ...arrowStyles,
          top: '100%',
          left: '50%',
          marginLeft: `-${arrowSize}px`,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid ${backgroundColor}`,
        };
      case 'bottom':
        return {
          ...arrowStyles,
          bottom: '100%',
          left: '50%',
          marginLeft: `-${arrowSize}px`,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid ${backgroundColor}`,
        };
      case 'left':
        return {
          ...arrowStyles,
          top: '50%',
          left: '100%',
          marginTop: `-${arrowSize}px`,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid ${backgroundColor}`,
        };
      case 'right':
        return {
          ...arrowStyles,
          top: '50%',
          right: '100%',
          marginTop: `-${arrowSize}px`,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid ${backgroundColor}`,
        };
      default:
        return arrowStyles;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      style={style}
    >
      {children}

      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 pointer-events-none"
          style={{
            ...tooltipStyle,
            backgroundColor,
            color: textColor,
            fontSize,
            padding,
            borderRadius,
            maxWidth,
            wordWrap: 'break-word',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            ...style,
          }}
        >
          {content}
          <div style={getArrowStyle()} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
