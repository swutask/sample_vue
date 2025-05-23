import fonts from '@/core/fonts'

export default ({ title, style }) => {
  return `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700;800;900&display=swap" rel="stylesheet">
    <title>${title}</title>
    <style>${fonts}</style>
    <style>${style}</style>
    <style type="text/css" media="print">
      @page {
        size: auto;  /* auto is the initial value */
        margin-bottom: 8mm; /* this affects the margin in the printer settings */
        margin-top: 8mm; /* this affects the margin in the printer settings */
      }
    </style>
  </head>
  <body>
    <div class="editor">
      insert_body_here
    </div>
  </body>
  </html>
`
}
