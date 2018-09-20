import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { shallow, mount  } from 'enzyme'

import App from '../../App'
import Nav from '../../components/Nav'
import store from '../../store'

describe('Navbar Component', () => {
  test('renders consistently', () => {
    const initialState = {
      isLoading: false,
      showLoginError: false,
      showSignupError: false,
      user: {},
      token: ''
    }

    const mockStore = configureStore()

    const wrapper = mount(
      <Provider store={ mockStore(initialState) }>
        <Nav />
      </Provider>
    )
  })
})
