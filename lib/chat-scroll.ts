import {
  IUseReverseInfiniteScrollOptions,
  ILoadMoreCb,
} from './reverse-infinite-scroll'
import {IUseStickyScrollOptions, useStickyScroll} from './sticky-scroll'
import {useReverseInfiniteScroll} from './reverse-infinite-scroll'

/**
 * React hook for making HTML element scroll behaved like chat.
 * If scroll is at the bottom - it would stay there when new content is added.
 * Infinite scroll behavior would kick in when scrolling up.
 * @param targetRef Reference of scrollable HTML element.
 * @param data Array of some data items displayed in a scrollable HTML element. It should normally come from a state.
 * @param loadMoreCb Callback for loading more data.
 * It is very important to ensure that this callback does not issue a request if end of data is reached. Otherwise target server might be spammed with requests.
 * @param options Additional options to customize hook behavior.
 */
export const useChatScroll = (
  targetRef: React.MutableRefObject<Element>,
  data: any[],
  loadMoreCb: ILoadMoreCb,
  options?: IUseChatScrollOptions,
): IUseChatScrollReturn => {
  const {
    disable: disableReverseInfiniteScroll,
    enable: enableReverseInfiniteScroll,
    enabled: reverseInfiniteScrollEnabled,
    updateLoadMoreCb,
  } = useReverseInfiniteScroll(
    targetRef,
    loadMoreCb,
    options?.reverseInfiniteScroll ?? {},
  )

  const {
    disable: disableStickyScroll,
    enable: enableStickyScroll,
    enabled: stickyScrollEnabled,
    scrollToBottom,
    sticky,
  } = useStickyScroll(targetRef, data, options?.stickyScroll ?? {})

  return {
    reverseInfiniteScrollEnabled,
    stickyScrollEnabled,
    enableReverseInfiniteScroll,
    disableReverseInfiniteScroll,
    enableStickyScroll,
    disableStickyScroll,
    sticky,
    scrollToBottom,
    updateLoadMoreCb,
  }
}

/**
 * Options for customizing behavior of useChatScroll hook.
 */
export interface IUseChatScrollOptions {
  /**
   * Options for reverse infinite scroll behavior.
   */
  reverseInfiniteScroll: IUseReverseInfiniteScrollOptions

  /**
   * Options for sticky scroll behavior.
   */
  stickyScroll: IUseStickyScrollOptions
}

/**
 * Flags and methods provided by useChatScroll hook.
 */
export interface IUseChatScrollReturn {
  /**
   * True when scroll is stuck to the bottom of target element.
   */
  sticky: boolean

  /**
   * Indicates whether reverse infinite scroll behavior is enabled.
   */
  reverseInfiniteScrollEnabled: boolean

  /**
   * True when sticky scroll behavior is enabled.
   */
  stickyScrollEnabled: boolean

  /**
   * Enables reverse infinite scroll behavior.
   */
  enableReverseInfiniteScroll: () => void

  /**
   * Disables reverse infinite scroll behavior.
   */
  disableReverseInfiniteScroll: () => void

  /**
   * Enables sticky scroll behavior.
   */
  enableStickyScroll: () => void

  /**
   * Disables sticky scroll behavior.
   */
  disableStickyScroll: () => void

  /**
   * Scrolls to bottom of the target element.
   */
  scrollToBottom: () => void

  /**
   * Overrides callback for loading more data with a new one.
   */
  updateLoadMoreCb: (newLoadMoreCb: ILoadMoreCb) => void
}
