import { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
  PlusCircleIcon,
  CreditCardIcon,
  TrendingUpIcon,
  AlertCircleIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/template';
import Button from '../../components/atoms/button';
import {
  PageHeader,
  HeaderContent,
  Title,
  Subtitle,
  SummarySection,
  SummaryCard,
  SummaryHeader,
  SummaryTitle,
  SummaryValue,
  Currency,
  SummaryDescription,
  AccountsGrid,
  ConnectBankCard,
  ConnectBankDescription,
  ConnectBankIcon,
  ConnectBankTitle,
  ContentContainer,
} from './styles';
import { accountsConnector } from '../../connector';
import AccountCard from '../../components/molecules/card/accountCard';
import { pickBalanceFields } from '../../helpers';

export interface BalanceToReturnProp {
  [key: string]: {
    id: string;
    amount: number;
    currency: string;
    type: string;
    metadata: object;
    accountDetailsId: string;
  };
}
export interface BalanceProps {
  id: string;
  amount: number;
  currency: string;
  type: string;
  metadata: object;
  accountDetailsId: string;
}
export interface AccountDetailsProps {
  id: string;
  resourceId: string;
  iban: string;
  scan: string;
  currency: string;
  ownerName: string;
  balance: BalanceProps[];
}

const AccountsDashboard: FC = () => {
  const [accountDetails, setAccountDetails] = useState<AccountDetailsProps[]>(
    []
  );
  const [balances] = useState<BalanceProps[]>([
    {
      id: 'ad5d8eef-031a-4944-8aa5-b971b7446cc4',
      amount: 45000.0,
      currency: 'GBP',
      type: 'balances',
      metadata: {},
      accountDetailsId: 'b490aa2c-02bb-4536-9d51-c2be353f5e4e',
    },
    {
      id: '3370cde0-1894-4ce5-99ea-5a8e69eb895f',
      amount: 6700.09,
      currency: 'GBP',
      type: 'balances',
      metadata: {},
      accountDetailsId: 'c7d8ae51-589a-40cf-9d71-4c3300fe48b8',
    },
    {
      id: '6837b570-ec6b-4736-ba22-672241d429a3',
      amount: 1206700.09,
      currency: 'GBP',
      type: 'balances',
      metadata: {},
      accountDetailsId: '614a6660-61d1-4a9b-bfed-4593d2568d01',
    },
  ]);

  const navigate = useNavigate();

  const fetchAccountDetails = async () => {
    const details: AccountDetailsProps[] =
      await accountsConnector.getAccountDetails();
    setAccountDetails(details);
  };

  // TODO: to work on this part after I have done some modifications in the backend 😊
  // const fetchBalancesByAccountId = async () => {
  //   const balances = await accountsConnector.getBalances();
  //   setBalances(balances)
  // };

  const mapBalancesToAccount = () => {
    const balanceToReturn: BalanceToReturnProp = {};
    const balanceToDetails = accountDetails.map(
      (detail: AccountDetailsProps) => {
        balances.forEach((balance: BalanceProps) => {
          if (detail.id === balance.accountDetailsId) {
            // @ts-expect-error: balanceToReturn type does not match AccountDetailsProps.balance, will refactor type later
            balanceToReturn[balance.accountDetailsId] = {
              ...pickBalanceFields(balance),
            };
          }
        });

        return {
          ...detail,
          balance: balanceToReturn,
        };
      }
    );

    return balanceToDetails;
  };

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  // useEffect(() => {
  //   fetchBalancesByAccountId();
  // }, []);
  const formattedDetails = mapBalancesToAccount();

  return (
    <Layout>
      <ContentContainer>
        <PageHeader>
          <HeaderContent>
            <Title>Your Accounts</Title>
            <Subtitle>
              Manage all your connected bank accounts in one place
            </Subtitle>
          </HeaderContent>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/onboard-institution')}
          >
            Connect Bank
          </Button>
        </PageHeader>
        <SummarySection>
          <SummaryCard>
            <SummaryHeader>
              <CreditCardIcon size={24} color="#3B82F6" />
              <SummaryTitle>Total Balance</SummaryTitle>
            </SummaryHeader>
            <SummaryValue>
              <Currency>£</Currency>
              {Number('4500').toFixed(2)}
            </SummaryValue>
            <SummaryDescription>Across all your accounts</SummaryDescription>
          </SummaryCard>
          <SummaryCard>
            <SummaryHeader>
              <TrendingUpIcon size={24} color="#10B981" />
              <SummaryTitle>Monthly Savings</SummaryTitle>
            </SummaryHeader>
            <SummaryValue>
              <Currency>£</Currency>
              450.25
            </SummaryValue>
            <SummaryDescription>
              15% increase from last month
            </SummaryDescription>
          </SummaryCard>
          <SummaryCard>
            <SummaryHeader>
              <AlertCircleIcon size={24} color="#F59E0B" />
              <SummaryTitle>Upcoming Bills</SummaryTitle>
            </SummaryHeader>
            <SummaryValue>
              <Currency>£</Currency>
              320.00
            </SummaryValue>
            <SummaryDescription>Due in the next 7 days</SummaryDescription>
          </SummaryCard>
        </SummarySection>
        <AccountsGrid>
          {/* @ts-expect-error: TODO:detail props does not match will refactor later */}
          {formattedDetails.map((detail: AccountDetailsProps) => (
            <AccountCard key={detail.id} detail={detail} />
          ))}
          <ConnectBankCard>
            <ConnectBankIcon>
              <PlusCircleIcon size={30} />
            </ConnectBankIcon>
            <ConnectBankTitle>Connect a New Bank</ConnectBankTitle>
            <ConnectBankDescription>
              Add another bank account to get a complete view of your finances
            </ConnectBankDescription>
            <Button
              variant="primary"
              onClick={() => navigate('/onboard-institution')}
            >
              Connect Bank
            </Button>
          </ConnectBankCard>
        </AccountsGrid>
      </ContentContainer>
    </Layout>
  );
};

export default AccountsDashboard;
