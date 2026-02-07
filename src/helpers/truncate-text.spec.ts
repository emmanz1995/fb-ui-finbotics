import { truncateText } from "./truncate-text";

describe('truncateText', () => {
  it('should return a truncated string', () => {
    expect(truncateText('Emmanuel Okuchukwu', 6)).toEqual('Emmanu...')
  })
})