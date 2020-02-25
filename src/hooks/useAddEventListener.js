import { useEffect, useRef } from "react";

/**
 * Add event listener hook.
 * @param ref Ref to the DOM element.
 */
export const useAddEventListener = (ref) => {
  /** Event listener tuple array [eventName, listener]. */
  const eventListeners = useRef([]);

  useEffect(() => () => {
    eventListeners.current.forEach(([event, handler]) =>
      // TODO: Change into nullish coalescence
      ref.current ? ref.current.removeEventListener(event, handler) : undefined
    );
    eventListeners.current = [];
  });

  return (propertyName, propertyValue) => {
    /** Transform onEventName into eventName */
    const eventName = propertyName.replace(/on./u, prefix =>
      prefix.substr(2).toLowerCase()
    );
    const handler = (event) => propertyValue(event);
    eventListeners.current = [...eventListeners.current, [eventName, handler]];
    // TODO: Change into nullish coalescence
    if (ref.current) {
      ref.current.addEventListener(eventName, handler);
    }
  };
};

export default useAddEventListener;
