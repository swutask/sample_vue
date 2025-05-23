export default function useDraggable () {
  function onDragEnd () {
    const className = 'grabbing'
    const html = document.getElementsByTagName('html').item(0)
    if (html && new RegExp(className).test(html.className) === true) {
      // Remove className with the added space (from setClassToHTMLElement)
      html.className = html.className.replace(
        new RegExp(' ' + className),
        ''
      )
      // Remove className without added space (just in case)
      html.className = html.className.replace(new RegExp(className), '')
    }
  }

  function onStart () {
    const className = 'grabbing'
    const html = document.getElementsByTagName('html').item(0)
    if (html && new RegExp(className).test(html.className) === false) {
      html.className += ' ' + className // use a space in case there are other classNames
    }
  }

  return { onDragEnd, onStart }
}
