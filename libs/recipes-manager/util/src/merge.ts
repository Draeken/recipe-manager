export const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return typeof obj === 'object' && obj !== null;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (fn: unknown): fn is Function => {
  return typeof fn === 'function';
};

/**
 * oldObj: { a: { b: 1, e: 8 }}
 * newObj: { a: { c: 2, e: undefined }}
 * result: { a: { b: 1, c: 2, e: 8 }}
 */
export const merge = (oldObj: unknown, newObj: unknown) => {
  if (!isObject(oldObj) || !isObject(newObj)) {
    if (isFunction(oldObj) && isFunction(newObj)) {
      return (...arg: unknown[]) => {
        oldObj(...arg);
        newObj(...arg);
      };
    }
    return newObj === undefined ? oldObj : newObj;
  }
  const result = { ...newObj, ...oldObj };
  Object.keys(oldObj).forEach((key) => {
    if (key in newObj) {
      result[key] = merge(oldObj[key], newObj[key]);
    }
  });
  return result;
};

export const mergeAll = (...objs: unknown[]) => {
  return objs.reduce((acc, cur) => merge(acc, cur));
};

/**
 * merge className with css
 * merge function with root function
 * merge objects with merge
 * props can't be of type Record<string, unknown>[], see https://github.com/microsoft/TypeScript/issues/15300
 */
export const mergeProps = (...props: any[]) => {
  const result: Record<string, unknown> = props.reduce(merge, {});
  if ('css' in result) {
    result.css = props.filter((prop) => prop && prop.css).map((prop) => prop.css);
  }
  return result;
};
