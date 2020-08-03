import { shallowMount } from '@vue/test-utils'
import HeadlineScroll from '../../src/components/HeadlineScroll.vue'
import App from '../../src/App.vue'

const appWrapper = shallowMount(App)
const headlineWrapper = shallowMount(HeadlineScroll)

// make sure the title is being displayed properly
it('renders correctly with different data', async () => {
  appWrapper.setData({ title: 'SPORTS' })
  await appWrapper.vm.$nextTick()
  expect(appWrapper.text()).toContain('SPORTS')
})

// on click the buttons in the app set the title content
it('button click sets title', () => {
  appWrapper.setData({ title: 'SPORTS' })
  const button = appWrapper.find('v-btn')
  button.trigger('click')
  expect(appWrapper.vm.title).toBe('HOME')
})

// when the props come in and the state is updated find the message returned in the html
it('updates the rendered message when wrapper.message updates', async () => {
  headlineWrapper.setData({
    articleTitle: {
      title: 'Mourinho is over rated',
      index: 1
    }
  })

  await headlineWrapper.vm.$nextTick()
  expect(headlineWrapper.text()).toContain('Mourinho is over rated')
})