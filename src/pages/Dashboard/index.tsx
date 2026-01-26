import { useState, useEffect } from 'react';
import type { FC, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowLeftIcon,
  CreditCardIcon,
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertCircleIcon,
  ShoppingBagIcon,
  BarChartIcon,
  LightbulbIcon,
} from 'lucide-react';
import { Title, Subtitle, ContentContainer } from '../../styles/common';
import Layout from '../../components/template';
import { accountsConnector } from '../../connector';
import {
  AccountDetailsSection,
  AccountDetailsContainer,
  AccountHeader,
  AccountInfo,
  AccountDetail,
  BalanceInfo,
  BalanceAmount,
  TransactionContainer,
  TransactionDetailsContainer,
  GridLayout,
  HeaderContent,
  SpendingOverviewContainer,
  SpendingPredicationContainer,
  RecentTransactionContainer,
  FinancialTipsContainer,
  HeaderContainer,
  FirstColumn,
  SecondColumn,
  Pagination,
} from './styles';
import { extractAccountNumber } from '../../helpers';
import Button from '../../components/atoms/button';

interface ResourceProps {
  id: string;
  amount: string;
  currency: string;
  details?: string;
  type: string;
  metadata: object;
  accountDetailsId: string;
}

interface Pagination {
  totalPages: number;
  page: number;
  transactionsPerPage: number;
  offset: number;
}
interface TransactionsProps {
  pagination: Pagination;
  transactions: ResourceProps[];
}
interface DetailProps {
  id: string;
  resourceId: string;
  iban?: string;
  scan: string;
  currency: string;
  ownerName: string;
}

const Dashboard: FC = () => {
  const [transactions, setTransactions] = useState<TransactionsProps>({
    pagination: {
      transactionsPerPage: 0,
      totalPages: 0,
      page: 0,
      offset: 0,
    },
    transactions: [],
  });
  // const [balances, setBalances] = useState<ResourceProps[]>([]);
  const [detail, setDetail] = useState<DetailProps>({
    id: '',
    resourceId: '',
    iban: '',
    scan: '',
    currency: '',
    ownerName: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tabs, setTabs] = useState('Transactions');
  const totalPages = transactions.pagination.totalPages;
  const navigate = useNavigate();
  const params = useParams();
  const accountId = params.accountId as string;

  useEffect(() => {
    const handleFetchAccountData = async () => {
      const transactionRes = await accountsConnector.getTransactions(
        accountId,
        {
          limit: 5,
          currentPage,
        }
      );

      setTransactions(transactionRes);
      setCurrentPage(transactionRes?.pagination?.currentPage);
    };

    handleFetchAccountData();
  }, [accountId, currentPage]);

  useEffect(() => {
    const getAccountDetail = async () => {
      const response =
        await accountsConnector.getAccountDetailsByAccountId(accountId);
      setDetail(response);
    };
    getAccountDetail();
  }, [accountId]);
  const scan = detail?.scan ? detail?.scan : '';
  const { accountNumber } = extractAccountNumber(scan);

  const handleSelectPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPage = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (currentPage < totalPages && currentPage >= 0)
      setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (currentPage > 0 && currentPage <= totalPages)
      setCurrentPage(currentPage - 1);
  };
  const pages = [];
  for (let i = 0; totalPages > i; i++) {
    pages.push(i + 1);
  }

  return (
    <Layout>
      <ContentContainer>
        <HeaderContent>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </Button>
          <Title>Account Details</Title>
        </HeaderContent>
        <AccountDetailsContainer>
          <AccountHeader>
            <AccountInfo>
              <h3>{detail.currency} Account</h3>
              <Subtitle>IBAN: GB29NWBK60161331926819</Subtitle>
            </AccountInfo>
            <BalanceInfo>
              <Subtitle>Current Balance</Subtitle>
              <BalanceAmount>
                <Subtitle>£</Subtitle>
                <h3>15000</h3>
              </BalanceAmount>
            </BalanceInfo>
          </AccountHeader>
          <AccountDetailsSection>
            <AccountDetail>
              <Subtitle>Account Owner</Subtitle>
              <h4>{detail.ownerName}</h4>
            </AccountDetail>
            <AccountDetail>
              <Subtitle>Account Number</Subtitle>
              <h4>{accountNumber}</h4>
            </AccountDetail>
            <AccountDetail>
              <Subtitle>Currency</Subtitle>
              <h4>GBP</h4>
            </AccountDetail>
            <AccountDetail>
              <Subtitle>Last Updated</Subtitle>
              <h4>2025-03-14</h4>
            </AccountDetail>
          </AccountDetailsSection>
        </AccountDetailsContainer>
        {/* ---------- Tabs ----------
        <div>
          <Button variant="outline" onClick={() => setTabs('Transactions')}>
            Transactions
          </Button>
          <Button variant="outline" onClick={() => setTabs('Savings')}>
            Saving Goals
          </Button>
        </div>
        {tabs === 'Transactions' && (
          <TransactionContainer>
            {transactions.transactions.map(transaction => (
              <TransactionDetailsContainer key={transaction.id}>
                <AccountDetail>
                  <Subtitle>Purchase</Subtitle>
                  <h4>{transaction.details ?? 'Untitled'}</h4>
                </AccountDetail>
                <AccountDetail>
                  <Subtitle>Amount</Subtitle>
                  <h4>
                    {transaction.currency} {transaction.amount}
                  </h4>
                </AccountDetail>
              </TransactionDetailsContainer>
            ))}
            <Pagination>
              <Button variant="outline" size="sm" onClick={handlePreviousPage}>
                Previous
              </Button>
              {pages.map((pageNum: number, i: number) => {
                return (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSelectPage(pageNum)}
                    key={i}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button variant="outline" size="sm" onClick={handleNextPage}>
                Next
              </Button>
            </Pagination>
          </TransactionContainer>
        )}
        {tabs === 'Savings' && <div>Saving Goals</div>} */}
        <GridLayout>
          <FirstColumn>
            <SpendingOverviewContainer>
              <HeaderContainer>
                <BarChartIcon />
                <h3>Spending Overview</h3>
              </HeaderContainer>
            </SpendingOverviewContainer>
            <FinancialTipsContainer>
              <HeaderContainer>
                <CreditCardIcon />
                <h3>Financial Tips</h3>
              </HeaderContainer>
            </FinancialTipsContainer>
          </FirstColumn>
          <SecondColumn>
            <SpendingPredicationContainer>
              <HeaderContainer>
                <TrendingUpIcon />
                <h3>Spending Prediction</h3>
              </HeaderContainer>
            </SpendingPredicationContainer>
            <RecentTransactionContainer>
              <HeaderContainer>
                <LightbulbIcon />
                <h3>Recent Transactions</h3>
              </HeaderContainer>
              <div>
                {transactions.transactions.map(transaction => (
                  <div key={transaction.id}>
                    <AccountDetailsSection>
                      <AccountDetail>
                        <Subtitle>Type</Subtitle>
                        <h4>{transaction.type}</h4>
                      </AccountDetail>
                      <AccountDetail>
                        <Subtitle>Amount</Subtitle>
                        <h4>
                          {transaction.currency} {transaction.amount}
                        </h4>
                      </AccountDetail>
                      <AccountDetail>
                        <Subtitle>Metadata</Subtitle>
                        <h4>{JSON.stringify(transaction.metadata)}</h4>
                      </AccountDetail>
                    </AccountDetailsSection>
                  </div>
                ))}
              </div>
              {/* <Pagination>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                >
                  Previous
                </Button>
                {pages.map((pageNum: number, i: number) => {
                  return (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSelectPage(pageNum)}
                      key={i}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button variant="outline" size="sm" onClick={handleNextPage}>
                  Next
                </Button>
              </Pagination> */}
            </RecentTransactionContainer>
          </SecondColumn>
        </GridLayout>
      </ContentContainer>
    </Layout>
  );
};

export default Dashboard;
