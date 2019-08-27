import useFetch from './index'
import { cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

/**
 * This is a temporary workaround to hide console errors because of a
 * known issue in the current version of react-test-renderer:
 * https://github.com/facebook/react/issues/14769
 */
const error = jest.spyOn(console, 'error')
error.mockImplementation(() => {})
afterAll(() => {
  error.mockRestore()
})

describe('useFetch', () => {
  const args = ['blah', true, 123]
  const mockSuccessResponse = { id: '123', name: 'thing' }
  const mockResolvedFetchPromise = jest.fn().mockResolvedValue({
    json: () => mockSuccessResponse
  })

  afterEach(() => {
    cleanup()
    mockResolvedFetchPromise.mockClear()
  })

  it('should invoke the callback function without arguments', () => {
    renderHook(() => useFetch(mockResolvedFetchPromise))
    expect(mockResolvedFetchPromise).toHaveBeenCalledTimes(1)
    expect(mockResolvedFetchPromise).toHaveBeenCalledWith()
  })

  it('should invoke the callback function with correct arguments when provided', async () => {
    renderHook(() => useFetch(mockResolvedFetchPromise, args))
    expect(mockResolvedFetchPromise).toHaveBeenCalledTimes(1)
    expect(mockResolvedFetchPromise).toHaveBeenCalledWith(args)
  })

  it('should return the correct values when the promise is resolved', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(mockResolvedFetchPromise, args)
    )
    expect(result.current).toEqual({
      loading: true,
      error: false,
      response: null
    })
    await waitForNextUpdate()
    expect(result.current).toEqual({
      loading: false,
      error: false,
      response: mockSuccessResponse
    })
  })

  it('should return the correct values when the promise is rejected', async () => {
    const mockRejectedFetchPromise = jest
      .fn()
      .mockRejectedValue(new Error('Async error'))
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(mockRejectedFetchPromise, args)
    )
    expect(result.current).toEqual({
      loading: true,
      error: false,
      response: null
    })
    await waitForNextUpdate()
    expect(result.current).toEqual({
      loading: false,
      error: true,
      response: null
    })
    mockRejectedFetchPromise.mockClear()
  })
})
