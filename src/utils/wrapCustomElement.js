import {
    createElement,
    useEffect,
    useRef
  } from "react";
import usePropertyToAttribute from "../hooks/usePropertyToAttribute";

/**
 * Wrap customElement to be "react compatible".
 * @param tagName Name of the component being wrapped.
 */
export const wrapCustomElement = (tagName) => Object.assign(
    (({ children, ...properties }) => {
        const ref = useRef(null);
        const propertyToAttribute = usePropertyToAttribute(ref);

        useEffect(() => {
            Object.keys(properties).map(property =>
            propertyToAttribute(property, properties[property])
            );
        }, [properties, propertyToAttribute]);

        return createElement(tagName, { ref }, children);
    }),
    {
        // We add this name to make it nicer for React dev tools
        displayName: `customElement(${tagName})`
    });

export default wrapCustomElement;
