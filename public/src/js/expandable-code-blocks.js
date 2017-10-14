document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = Array.from(document.querySelectorAll('pre'));
  codeBlocks.forEach(block => {
    if (block.scrollWidth > block.clientWidth) {
      block.classList.add('expandable');
    }
  });
});
