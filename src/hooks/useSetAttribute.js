/**
 * Set/Remove attribute tuple hook.
 * @param ref Ref to the DOM element.
 */
export const useSetAttribute = (ref) =>
  [
    (name, value) => ref.current && ref.current.getAttribute(name) !== value ? ref.current.setAttribute(name, value) : undefined,
    (name) => ref.current && ref.current.getAttribute(name) ? ref.current.removeAttribute(name) : undefined
  ];

export default useSetAttribute;
