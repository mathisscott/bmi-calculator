import useAddEventListener from "./useAddEventListener";
import useSetAttribute from "./useSetAttribute";

/**
 * React property to element attribute setter hook.
 * @param ref Ref to the DOM element.
 */
export const usePropertyToAttribute = (ref) => {
  const addEventListener = useAddEventListener(ref);
  const [setAttribute, removeAttribute] = useSetAttribute(ref);
  const reactProperties = [
    "children",
    "className",
    "localName",
    "ref",
    "style"
  ];

  return (property, value) => {
    if (!reactProperties.includes(property)) {
      if (typeof value === "function") {
        addEventListener(property, value);
      } else {
        // TODO: Change into nullish coalescence
        if (ref.current) {
          ref.current[property] = value;
        }
        switch (typeof value) {
          case "bigint":
          case "number":
          case "object":
          case "undefined":
            value !== null && value !== undefined
              ? setAttribute(property, JSON.stringify(value))
              : removeAttribute(property);
            break;
          case "string":
            setAttribute(property, value);
            break;
          case "boolean":
            value
              ? setAttribute(property, property)
              : removeAttribute(property);
            break;
        }
      }
    }
  };
};

export default usePropertyToAttribute;
