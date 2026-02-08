import { render, screen, fireEvent } from '@testing-library/react';
import AccountCard from './index';

describe('test', () => {
  const details = {
    id: 'abc-123',
    resourceId: 'res-abc-123',
    iban: 'iban-345',
    scan: '17584937583950',
    currency: 'GBP',
    ownerName: 'Jason Duval',
    balance: [],
  };

  const isLoading = false;
  const mockHandleAccountDataSync = jest.fn();
  it('should test', async () => {
    render(
      <AccountCard
        detail={details}
        isLoading={isLoading}
        handleAccountDataSync={mockHandleAccountDataSync}
      />
    );

    expect(screen.getByText('GBP Account')).toBeDefined();
    expect(mockHandleAccountDataSync).not.toHaveBeenCalled();
  });

  it('should handle account data sync', () => {
    render(
      <AccountCard
        detail={details}
        isLoading={isLoading}
        handleAccountDataSync={mockHandleAccountDataSync}
      />
    );

    const refreshBtn = screen.getByTestId('test-refresh-btn');
    fireEvent.click(refreshBtn);

    expect(mockHandleAccountDataSync).toHaveBeenCalledTimes(1);
    expect(mockHandleAccountDataSync).toHaveBeenCalledWith('abc-123');
  });
});
