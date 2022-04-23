window.addEventListener('DOMContentLoaded', () => {
  const subjectInput = document.getElementById('subject');
  const templatetextArea = document.getElementById('template');
  const submitButton = document.getElementById('submit');

  const subjectLegendsBtn = document.getElementsByClassName('subject-legend');
  const templateLegendsBtn = document.getElementsByClassName('template-legend');

  function getCursorInfo(element) {
    const startIndex = element.selectionStart;
    const endIndex = element.selectionEnd;
    const subStr = element.value.substr(0, startIndex);
    const subStrSecondPart = element.value.substr(startIndex);
    return {
      startIndex,
      endIndex,
      subStr,
      subStrSecondPart,
    };
  }

  function putTextAtCursorPoint(element, text) {
    const { startIndex, subStr, subStrSecondPart } = getCursorInfo(element);
    element.value = `${subStr}${text}${subStrSecondPart}`;
    element.focus();
    element.selectionEnd = startIndex + text.length;
  }

  Object.keys(subjectLegendsBtn)
    .map((key) => subjectLegendsBtn[key])
    .forEach((element) => {
      element.addEventListener('click', function (event) {
        const { textContent: legend } = event.target;
        putTextAtCursorPoint(subjectInput, legend);
      });
    });

  Object.keys(templateLegendsBtn)
    .map((key) => templateLegendsBtn[key])
    .forEach((element) => {
      element.addEventListener('click', function (event) {
        const { textContent: legend } = event.target;
        putTextAtCursorPoint(templatetextArea, legend);
      });
    });

  submitButton.addEventListener('click', () => {
    console.log({
      subjectInput: subjectInput.value,
      templatetextArea: templatetextArea.value,
    });
  });
});
