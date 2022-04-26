window.addEventListener('DOMContentLoaded', () => {
  const subjectInput = document.getElementById('subject');
  const templatetextArea = document.getElementById('template');
  const submitButton = document.getElementById('submit');

  const subjectLegendsBtn = document.getElementsByClassName('subject-legend');
  const templateLegendsBtn = document.getElementsByClassName('template-legend');

  const contenteditableLegendsBtn = document.getElementsByClassName(
    'contenteditable-legend'
  );

  const contentEditorIframe = document.querySelector('iframe');

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

  function insertTextNodeAtCursorContentEditable(text) {
    const selection = contentEditorIframe.contentWindow.document.getSelection();

    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);

      range.deleteContents();

      const span = document.createElement('span');
      span.className = 'color-yellow';
      span.innerText = text;

      range.insertNode(span);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);
      return span;
    }
  }

  contentEditorIframe.onload = () => {
    const { document } = contentEditorIframe.contentWindow;

    const contenteditableDiv = document.body;

    Object.keys(contenteditableLegendsBtn)
      .map((key) => contenteditableLegendsBtn[key])
      .forEach((element) => {
        element.addEventListener('click', function (event) {
          const { textContent: legend } = event.target;
          const newNode = insertTextNodeAtCursorContentEditable(legend);
          if (newNode) {
            const selection = document.getSelection();
            const range = document.createRange();

            range.setStartAfter(newNode);
            range.collapse(true);

            selection.removeAllRanges();
            selection.addRange(range);

            contenteditableDiv.focus();
          }
        });
      });
  };

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
