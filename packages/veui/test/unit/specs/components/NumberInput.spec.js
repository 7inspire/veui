import { mount } from '@vue/test-utils'
import sinon from 'sinon'
import Input from '@/components/Input'
import NumberInput from '@/components/NumberInput'

describe('components/NumberInput', () => {
  it('should handle value prop with `null` value.', async () => {
    let wrapper = mount(NumberInput, {
      propsData: {
        value: null
      }
    })

    let changeHandler = sinon.spy()
    wrapper.vm.$on('change', changeHandler)
    wrapper.find('input').trigger('change')

    await wrapper.vm.$nextTick()
    expect(changeHandler.callCount).to.equal(0)
  })

  it('should transparently pass-through attrs to the <input> element.', () => {
    let wrapper = mount(NumberInput, {
      attrs: {
        autofocus: '',
        selectOnFocus: ''
      }
    })

    expect(wrapper.find(Input).props('selectOnFocus')).to.equal(true)
    expect(wrapper.find('input').element.autofocus).to.equal(true)
  })

  it('should hanlde focus event correctly', async () => {
    let wrapper = mount(NumberInput)
    wrapper.find('input').trigger('focus')

    let { vm } = wrapper
    await vm.$nextTick()

    expect(
      wrapper.find('div.veui-input').classes('veui-input-focused')
    ).to.equal(true)

    wrapper.destroy()
  })

  it('disabled input should not be focused when activated', async () => {
    let wrapper = mount(NumberInput, {
      propsData: {
        disabled: true
      }
    })

    let { vm } = wrapper
    vm.activate()
    await vm.$nextTick()

    expect(
      wrapper.find('div.veui-input').classes('veui-input-focused')
    ).to.equal(false)

    wrapper.destroy()
  })

  it('should not exceed max or min value', async () => {
    let wrapper = mount(NumberInput, {
      propsData: {
        max: 2,
        min: 2
      }
    })

    let input = wrapper.find('input')
    input.setValue(2)
    wrapper.find('button.veui-number-input-step-up').trigger('click')
    expect(input.element.value).to.equal('2')

    input.setValue(2)
    wrapper.find('button.veui-number-input-step-down').trigger('click')
    expect(input.element.value).to.equal('2')
  })

  it('should handle readonly correctly', async () => {
    let wrapper = mount(NumberInput, {
      propsData: {
        readonly: true
      }
    })

    let input = wrapper.find('input.veui-input-input')
    input.setValue(2)
    expect(
      input.attributes('readonly')
    ).to.equal('readonly')

    expect(input.element.value).to.equal('2')
  })
})
