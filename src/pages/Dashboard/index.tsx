import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  // ArrowLeftIcon,
  CreditCardIcon,
  // CalendarIcon,
  TrendingUpIcon,
  // TrendingDownIcon,
  // AlertCircleIcon,
  // ShoppingBagIcon,
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
  GridLayout,
  HeaderContent,
  SpendingOverviewContainer,
  SpendingPredicationContainer,
  RecentTransactionContainer,
  FinancialTipsContainer,
  HeaderContainer,
  FirstColumn,
  SecondColumn,
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
interface TransactionsProps {
  transactionsPerPage: number;
  totalPages: number;
  page: number;
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
    transactionsPerPage: 0,
    totalPages: 0,
    page: 0,
    transactions: [],
  });
  const [balances, setBalances] = useState<ResourceProps[]>([]);
  const [detail, setDetail] = useState<DetailProps>({
    id: '',
    resourceId: '',
    iban: '',
    scan: '',
    currency: '',
    ownerName: '',
  });

  const navigate = useNavigate();
  const params = useParams();
  const accountId = params.accountId as string;

  useEffect(() => {
    const handleFetchAccountData = async () => {
      const [transactionsRes, balancesRes] = await Promise.all([
        await accountsConnector.getTransactions(accountId, {
          limit: 5,
          currentPage: 1,
        }),
        await accountsConnector.getBalances(accountId),
      ]);

      setTransactions(transactionsRes);
      setBalances(balancesRes);
    };

    handleFetchAccountData();
  }, [accountId]);

  console.log(transactions);
  console.log(balances);

  useEffect(() => {
    const getAccountDetail = async () => {
      const response =
        await accountsConnector.getAccountDetailsByAccountId(accountId);
      setDetail(response);
    };
    getAccountDetail();
  }, [accountId]);

  const { accountNumber } = extractAccountNumber(detail?.scan);

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
            </RecentTransactionContainer>
          </SecondColumn>
        </GridLayout>
      </ContentContainer>
    </Layout>
  );
};

export default Dashboard;
