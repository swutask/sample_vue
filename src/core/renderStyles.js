export default (maxW, fontFamily, fontSize) => {
  const fallbackFonts = {
    Archia: 'sans-serif',
    'Basier Circle': 'sans-serif',
    Geomanist: 'sans-serif',
    Lato: 'sans-serif',
    Lora: 'serif',
    'Overpass Mono': 'monospace',
    Poppins: 'sans-serif',
    'PT Sans': 'sans-serif',
    'Silka mono': 'monospace'
  }

  return `
    html {
      width: 1000px;
      margin: 0 auto;
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      font-size: ${fontSize};
    }

    *, ::before, ::after {
      box-sizing: border-box;
      border-width: 0;
      border-style: solid;
      border-color: currentColor;
      word-wrap: break-word;
    }

    body {
      font-family: ${fontFamily}, ${fallbackFonts[fontFamily]};
      font-size: 1rem;
      ${fontFamily === 'Silka mono' ? 'letter-spacing: -1px; line-height: 1.8;' : ''}
    }

    .editor {
      max-width: ${maxW}px;
      margin: 50px auto;
      padding: 15px 25px;
    }

    * {
      font-family: ${fontFamily}, ${fallbackFonts[fontFamily]};
    }

    th {
      font-weight: 400;
    }

    p, h1, h2, h3, h4, h5, h6, ul, ol, pre {
      margin: 0;
      line-height: 1.6;
    }

    u, em, strong, span, a {
      font-size: inherit;
    }

    h1, h2, h3, h4, h5, h6, strong, b {
      font-weight: 600
    }

    h1.title {
      font-weight: 700;
      font-size: 2.3125rem;
    }

    h1 {
      font-size: 2.125rem;
    }

    h2 {
      font-size: 1.625rem;
    }

    h3 {
      font-size: 1.3125rem;
    }

    a {
      text-decoration: none;
    }

    button {
      background-color: transparent;
      padding: 0;
      font-size: 1rem;
    }

    .editor {
      position: relative;
    }

    ul, ol {
      padding-left: 0;
    }

    ol {
      list-style-type: decimal;
    }

    *::selection {
      background-color: #e4f2ff;
    }

    hr {
      color: #e5e5e5;
      margin: 10px 0;
    }

    mark {
      background-color: transparent;
    }

    blockquote {
      border-left: 3px solid #D8D8D8;
      padding-left: .8rem;
      font-style: italic;
    }

    .color-block {
      padding: 25px 40px;
      border-radius: 4px;
    }

    .color-block pre {
      padding: 0;
      margin: 0;
      background-color: transparent;
      border: none;
      font-family: inherit;
    }

    a {
      color: blue;
      cursor: pointer;
    }

    .todo_list,
    .todo_list li {
      list-style: none;
      padding-left: 0;
      margin-left: 0;
      word-break: break-word;
    }

    ul[data-type="todo_list"] li::before {
      content: '';
    }

    li[data-type="todo_item"] {
      display: block;
    }

    .todo-checkbox {
      display: inline-block;
      border: 2px solid #DDD;
      height: 17px;
      width: 17px;
      margin-right: 10px;
      cursor: pointer;
      border-radius: 2px;
      background-color: transparent;
      user-select: none;
      transition: background 0.4s;
    }

    .todo-content {
      transition: all .3s;
      display: inline-block;
      vertical-align: top;
    }

    .todo-content > p:last-of-type {
      margin-bottom: 0;
      line-height: 1.1;
    }

    .todo-content > ul[data-type="todo_list"] {
      list-style: none;
      margin: .5rem 0;
    }

    .todo-checked > span {
      position: relative;
      background-color: #eee;
      border-color: #eee;
    }

    .todo-checked > span::after {
      content: "";
      position: absolute;
      left: 4px;
      width: 5px;
      height: 11px;
      border-color: #02d9ad;
      transform-origin: center;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      border-right-width: 2px;
      border-bottom-width: 2px;
    }

    .todo-checked > .todo-content {
      text-decoration: line-through;
      color: #D6D6D6;
    }

    pre {
      background: #F8F8F8;
      padding: 12px;
      border: 0.5px solid #D8D8D8;
      border-radius: 4px;
      white-space: pre-wrap;
      page-break-inside: avoid;
    }

    .mention {
      color: #005DDA;
    }

    .comment {
      background-color: #fdffe4;
    }

    .comment-icon {
      position: absolute;
      right: -10px;
      margin-top: 4px;
      @apply text-blue-main;
    }

    [indent="1"] {
      margin-left: 30px !important;
    }

    [indent="2"] {
      margin-left: 60px !important;
    }

    [indent="3"] {
      margin-left: 90px !important;
    }

    [indent="4"] {
      margin-left: 120px !important;
    }

    [indent="5"] {
      margin-left: 150px !important;
    }

    [indent="6"] {
      margin-left: 180px !important;
    }

    [indent="7"] {
      margin-left: 210px !important;
    }
  `
}
