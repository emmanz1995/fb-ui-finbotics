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
  const [balances, setBalances] = useState<BalanceProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchAccountDetails = async () => {
    const details: AccountDetailsProps[] =
      await accountsConnector.getAccountDetails();
    setAccountDetails(details);
  };

  const fetchBalances = async () => {
    const balancesRes = await accountsConnector.getAllBalances();
    setBalances(balancesRes);
  };

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

  useEffect(() => {
    fetchBalances();
  }, []);
  const formattedDetails = mapBalancesToAccount();

  const handleAccountDataSync = async (accountId: string): Promise<void> => {
    setLoading(false);
    try {
      setLoading(true);
      await accountsConnector.onIngestAccountData(accountId);
      await fetchAccountDetails();
      await fetchBalances();
      setLoading(false);
    } catch (err: Error | unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        console.log('Failed to sync bank data:', err.message);
      }
      // this is for debugging purposes, this will be cleared later on
      console.log('...err', err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
            <AccountCard
              key={detail.id}
              detail={detail}
              handleAccountDataSync={handleAccountDataSync}
              isLoading={loading}
            />
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
