jest.mock('../../connector', () => ({
  accountsConnector: {
    getTransactions: jest.fn(),
  },
}));

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Transactions from '.';
import { accountsConnector } from '../../connector';

describe('transactions page tests', () => {
  it('should render page', async () => {
    (accountsConnector.getTransactions as jest.Mock).mockImplementation(() => ({
      transactions: [
        {
          id: 'abc-123',
          amount: '500',
          details: 'GAME',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: "FPO",
            bookingDate: "2025-12-19"
          },
          accountDetailsId: 'def-456'
        },
      ],
      pagination: {
        totalPages: 1,
        currentPage: 1,
        transactionsPerPage: 0,
      },
    }));

    render(
      <MemoryRouter initialEntries={['/view-transactions/def-456']}>
        <Routes>
          <Route
            path={'/view-transactions/:accountId'}
            element={<Transactions />}
          />
        </Routes>
      </MemoryRouter>
    );

    const title = screen.getByTestId('title-test');
    const para = screen.getByText(
      'View and filter your complete transaction history across all accounts.'
    );
    const table = screen.getByRole('table');
    expect(title).toBeDefined();
    expect(para).toBeDefined();
    expect(table).toBeDefined();
    expect(await screen.findByText('GAME')).toBeDefined();
    expect(await screen.findByText('2025-12-19')).toBeDefined();
    
    expect(accountsConnector.getTransactions).toHaveBeenCalledTimes(1);
    expect(accountsConnector.getTransactions).toHaveBeenCalledWith('def-456', {
      currentPage: 1,
      limit: 10,
    });
  });
});
