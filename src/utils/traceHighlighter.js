/**
 * Creates error markers for code output from traceback data
 *
 * @param {string}      value             The traceback output
 * @param {number|null} coconutErrorCall  The Coconut traceback error call
 * @param {string|null} pythonErrorCall   The Python traceback error call
 * @param {string}      className         The css classname for marker styling
 *
 * @return [object] The list of error marker objects
 */
const traceErrorMarker = (
  value,
  coconutErrorCall,
  pythonErrorCall,
  className
) => {
  if (coconutErrorCall || pythonErrorCall) {
    return [
      {
        startRow: 0,
        endRow: 0,
        startCol: 0,
        endCol: value.length,
        className,
      },
    ];
  }
  return [];
};

export default traceErrorMarker;
