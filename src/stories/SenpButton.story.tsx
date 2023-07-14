import SenpButton from '../components/SenpButton.vue'

export default defineStory({
  component: SenpButton,
  title: 'SenpButton: default',
  args: {
    intent: 'primary',
  },
  slotArgs: {
    default: () => <div>some slot content</div>,
  },
})
