declare module 'katex' {
  const katex: {
    renderToString(source: string, options?: {
      displayMode?: boolean;
      throwOnError?: boolean;
      output?: 'html' | 'mathml' | 'htmlAndMathml';
    }): string;
  };
  export default katex;
}
