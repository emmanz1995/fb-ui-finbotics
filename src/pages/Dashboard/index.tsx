import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  HeaderContent,
  Title,
  Subtitle,
  ContentContainer,
} from '../../styles/common';
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
} from './styles';
import { extractAccountNumber } from '../../helpers';

const Dashboard: FC = () => {
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState([]);
  const [detail, setDetail] = useState({});

  const params = useParams();
  const accountId = params.accountId as string;

  useEffect(() => {
    const handleFetchAccountData = async () => {
      const [transactions, balances] = await Promise.all([
        await accountsConnector.getTransactions(accountId, {
          limit: 5,
          currentPage: 1,
        }),
        await accountsConnector.getBalances(accountId),
      ]);

      setTransactions(transactions);
      setBalances(balances);
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

  const { accountNumber, sortCode } = extractAccountNumber(
    detail?.scan as string
  );

  return (
    <Layout>
      <ContentContainer>
        <HeaderContent>
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
          {/* <div>efkj</div>
            <div>efkj</div>
            <div>efkj</div>
            <div>efkj</div>
            <div>efkj</div>
            <div>efkj</div> */}
        </GridLayout>
      </ContentContainer>
    </Layout>
  );
};

export default Dashboard;
