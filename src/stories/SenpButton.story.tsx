import SenpButton from '../components/SenpButton.vue'

export default defineStory({
  component: SenpButton,
  title: 'SenpButton: default',
  args: {
    theme: 'primary',
  },
  slotArgs: {
    default: () => <div>some slot content</div>,
  },
})
