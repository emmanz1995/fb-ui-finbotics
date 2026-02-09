jest.mock('../../connector', () => ({
  accountsConnector: {
    getTransactions: jest.fn(),
  },
}));

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Transactions from '.';
import { accountsConnector } from '../../connector';

describe('transactions page tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render page', async () => {
    (accountsConnector.getTransactions as jest.Mock).mockImplementation(() => ({
      transactions: [
        {
          id: 'abc-123',
          amount: '500',
          details: 'GAME',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'FPO',
            bookingDate: '2025-12-19',
          },
          accountDetailsId: 'def-456',
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

  it('should navigate through pagination', async () => {
    (accountsConnector.getTransactions as jest.Mock).mockImplementation(() => ({
      transactions: [
        {
          id: 'abc-123',
          amount: '500',
          details: 'GAME',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'FPO',
            bookingDate: '2025-12-19',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-124',
          amount: '750',
          details: 'MOVIE',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'FPO',
            bookingDate: '2025-12-18',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-125',
          amount: '300',
          details: 'CONCERT',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'POS',
            bookingDate: '2025-12-17',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-126',
          amount: '120',
          details: 'ARCADE',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'POS',
            bookingDate: '2025-12-16',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-127',
          amount: '999',
          details: 'GAME DLC',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'FPO',
            bookingDate: '2025-12-15',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-128',
          amount: '450',
          details: 'BOWLING',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'POS',
            bookingDate: '2025-12-14',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-129',
          amount: '200',
          details: 'STREAMING',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'DD',
            bookingDate: '2025-12-13',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-130',
          amount: '650',
          details: 'THEATRE',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'POS',
            bookingDate: '2025-12-12',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-131',
          amount: '80',
          details: 'MOBILE GAME',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'POS',
            bookingDate: '2025-12-11',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-132',
          amount: '1100',
          details: 'EVENT TICKET',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'FPO',
            bookingDate: '2025-12-10',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-133',
          amount: '275',
          details: 'ESCAPE ROOM',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'POS',
            bookingDate: '2025-12-09',
          },
          accountDetailsId: 'ghi-789',
        },
        {
          id: 'abc-134',
          amount: '560',
          details: 'VR EXPERIENCE',
          category: 'ENTERTAINMENT',
          metadata: {
            proprietaryBankTransactionCode: 'POS',
            bookingDate: '2025-12-08',
          },
          accountDetailsId: 'ghi-789',
        },
      ],
      pagination: {
        totalPages: 12,
        currentPage: 2,
        transactionsPerPage: 1,
      },
    }));

    render(
      <MemoryRouter initialEntries={['/view-transactions/ghi-789']}>
        <Routes>
          <Route
            path={'/view-transactions/:accountId'}
            element={<Transactions />}
          />
        </Routes>
      </MemoryRouter>
    );

    const nextBtn = screen.getByTestId('next-btn');
    fireEvent.click(nextBtn);

    const table = screen.getByRole('table');
    expect(table).toBeDefined();

    await waitFor(() => {
      expect(accountsConnector.getTransactions).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(accountsConnector.getTransactions).toHaveBeenCalledWith(
        'ghi-789',
        { currentPage: 1, limit: 10 }
      );
      expect(accountsConnector.getTransactions).toHaveBeenCalledWith(
        'ghi-789',
        { currentPage: 2, limit: 10 }
      );
    });
  });
});
