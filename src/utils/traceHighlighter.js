/**
 * Creates error markers for code output from traceback data
 *
 * @param {string}      value     The traceback output
 * @param {string|null} errorCall The traceback error call
 * @param {string}      className The css classname for marker styling
 *
 * @return [object] The list of error marker objects
 */
const traceErrorMarker = (value, errorCall, className) => {
  if (errorCall) {
    // const lines = code.split('\n');
    // const lineNumber = errorLine - 1;
    // if (lineNumber < lines.length) {
    //   const line = lines[lineNumber];
    //   const start = line.indexOf(errorCall);
    // if (start !== -1) {
    return [
      {
        startRow: 0, // lineNumber,
        endRow: 0, // lineNumber,
        startCol: 0, // start,
        endCol: value.length, // errorCall.length,
        className,
      },
    ];
    // }
    // }
  }
  return [];
};

export default traceErrorMarker;
