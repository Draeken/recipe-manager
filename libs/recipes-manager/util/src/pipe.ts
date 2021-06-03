const _pipe = (a: any, b: any) => (...args: any[]) => b(a(...args));

export const pipe = (...ops: any[]) => ops.reduce(_pipe);
