window.addEventListener('DOMContentLoaded', () => {
  const subjectInput = document.getElementById('subject');
  const templatetextArea = document.getElementById('template');
  const submitButton = document.getElementById('submit');

  const subjectLegendsBtn = document.getElementsByClassName('subject-legend');
  const templateLegendsBtn = document.getElementsByClassName('template-legend');
  const contenteditableLegendsBtn = document.getElementsByClassName(
    'contenteditable-legend'
  );
  const contenteditableDiv = document.getElementById('contentEditor');

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

  Object.keys(contenteditableLegendsBtn)
    .map((key) => contenteditableLegendsBtn[key])
    .forEach((element) => {
      element.addEventListener('click', function (event) {
        const { textContent: legend } = event.target;
        insertTextAtCursor(legend);
      });
    });

  function insertTextAtCursor(text) {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      let parentNode = range.commonAncestorContainer.parentElement;
      let contentEditorChild = false;
      while (parentNode.tagName !== 'BODY') {
        parentNode = parentNode.parentElement;
        if (parentNode === contenteditableDiv) {
          contentEditorChild = true;
          break;
        }
      }

      if (contentEditorChild) {
        range.deleteContents();

        const span = document.createElement('span');
        span.innerText = text;

        range.insertNode(span);
        range.collapse(false);

        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }

  submitButton.addEventListener('click', () => {
    console.log({
      subjectInput: subjectInput.value,
      templatetextArea: templatetextArea.value,
    });
  });
});
