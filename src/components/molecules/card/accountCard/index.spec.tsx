import { render } from '@testing-library/react';
import AccountCard from './index';

describe('test', () => {
  const details = {
    id: 'abc-123',
    resourceId: 'res-abc-123',
    iban: 'iban-345',
    scan: '17584937583950',
    currency: '4500',
    ownerName: 'Jason Duval',
    balance: {},
  };
  it('should test', async () => {
    const { getByText } = render(<AccountCard detail={details} />);

    expect(getByText('GBP Account')).toBeDefined();
  });
});
