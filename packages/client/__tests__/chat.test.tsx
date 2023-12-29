import React from 'react'
import Page from '../app/page'
import ReactDOM from 'react-dom/client';
import fetchMock from 'jest-fetch-mock';
import Messages from '@/components/Messages';
import { ChatMessage } from '@/helpers/types';
import { render, screen, waitFor } from '@testing-library/react';

fetchMock.enableMocks()

const messages: ChatMessage[] = [
  {
    message: "Hello ai",
    type: "human"
  },
  {
    message: "Hello human",
    type: "ai"
  }
]

beforeEach(() => {
  fetchMock.mockIf(/^.*$/, async _req => {
    return { body: JSON.stringify(messages)}
  })
})

describe('Messages Component', () => {
  it('renders', () => {
    render(<Messages 
      chatHistory={messages}
      loading={false}
    />)

    expect(screen.getByText('Hello ai'))
  })
})

describe('Chat Interface', () => {
  it('renders messages', async () => {
    render(<Page />)
    await waitFor(() => screen.getByText('Hello human'))
  })
})
