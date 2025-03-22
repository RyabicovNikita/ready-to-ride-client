export const mergeStringsBySpace = (stringArr) =>
  Array.isArray(stringArr)
    ? stringArr.reduce((acc, str) => {
        if (str) acc = acc ? (acc += " " + str) : str;
        return acc;
      }, "")
    : "";
