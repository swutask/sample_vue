<script>
import { onMounted, onBeforeUnmount, computed } from 'vue'

export default {
  name: 'ExpandedTextarea',

  props: {
    refKey: {
      type: String,
      default: 'textareaRef'
    }
  },

  setup (props, { slots }) {
    const element = computed(() => slots.default()[0].ref.i.refs[props.refKey])

    const init = () => {
      if (element.value.scrollHeight > 75) {
        element.value.style.height = '100px'
      } else if (element.value.scrollHeight < 25) {
        element.value.style.height = '25px'
      } else {
        element.value.style.height = (element.value.scrollHeight) + 'px'
      }
    }

    const resizeTextarea = (event) => {
      if (parseInt(event.target.style.height) > 75) {
        event.target.style.height = '100px'
        return
      }

      event.target.style.height = 'auto'
      event.target.style.height = (event.target.scrollHeight) + 'px'
    }

    onMounted(() => {
      init()

      element.value.addEventListener('input', resizeTextarea)
    })

    onBeforeUnmount(() => {
      element.value.removeEventListener('input', resizeTextarea)
    })

    return () => slots && slots.default && slots.default()
  }
}
</script>
