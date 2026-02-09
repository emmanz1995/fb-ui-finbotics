jest.mock('../../connector', () => ({
  accountsConnector: {
    getTransactions: jest.fn(),
    getAccountDetailsByAccountId: jest.fn(),
  },
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '.';
import { accountsConnector } from '../../connector';
import { useParams } from 'react-router-dom';

describe('Dashboard func', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render component', async () => {
    (useParams as jest.Mock).mockImplementation(() => ({
      accountId: 'abc-123',
    }));
    (
      accountsConnector.getAccountDetailsByAccountId as jest.Mock
    ).mockImplementation(() => ({
      id: 'abc-123',
      resourceId: '0a3b1856-a620-433f-928b-d4ce4c835c74',
      currency: 'GBP',
      ownerName: 'Emmanuel Okuchukwu',
      scan: '11111122222222',
      accountType: 'CACC',
      usage: 'PRIV',
      iban: 'GBP34334343355869607986',
    }));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.findByText('Emmanuel Okuchukwu')).toBeDefined();
      expect(screen.findByText('111111')).toBeDefined();
      expect(screen.findByText('22222222')).toBeDefined();
      expect(screen.findByText('CACC')).toBeDefined();
    });
    expect(
      accountsConnector.getAccountDetailsByAccountId
    ).toHaveBeenCalledTimes(1);
    expect(accountsConnector.getAccountDetailsByAccountId).toHaveBeenCalledWith(
      'abc-123'
    );
  });
});
