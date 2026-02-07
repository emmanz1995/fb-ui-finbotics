import { useState, useEffect } from 'react';
import type { FC, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/template';
import {
  Header,
  FiltersSection,
  TableSection,
  FooterSection,
  FilterFlex,
  SmallSelectionWrapper,
  Table,
  Th,
  Tr,
  Td,
} from './styles';
import Input from '../../components/atoms/input';
import Button from '../../components/atoms/button';
import Select from '../../components/atoms/select';
import { accountsConnector } from '../../connector';
import { truncateText } from '../../helpers';

interface ResourceProps {
  id: string;
  amount: string;
  currency: string;
  details?: string;
  type: string;
  metadata: object;
  accountDetailsId: string;
  category?: string;
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

const Transactions: FC = () => {
  const params = useParams();
  const accountId = params.accountId as string;
  const [transactions, setTransactions] = useState<TransactionsProps>({
    pagination: {
      transactionsPerPage: 0,
      totalPages: 0,
      page: 0,
      offset: 0,
    },
    transactions: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  // const [limit, setLimit] = useState(0);
  const limit = 10
  const totalPages = transactions.pagination.totalPages;

  useEffect(() => {
    (async () => {
      const trx = await accountsConnector.getTransactions(accountId, {
        currentPage,
        limit,
      });
      setTransactions(trx);
      setCurrentPage(trx?.pagination?.currentPage);
    })();
  }, [accountId, currentPage]);

  const { transactions: trx } = transactions;

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
      <Header>
        <h1>Transaction</h1>
        <p>
          View and filter your complete transaction history across all accounts.
        </p>
      </Header>
      {/* -------- Filter -------- */}
      <FiltersSection>
        <FilterFlex>
          <div>
            <Input type="search" placeholder="Search Transactions" />
          </div>
          <SmallSelectionWrapper>
            <div>
              <Select
                options={[
                  { label: 'Select your Account', value: '' },
                  { label: 'Account 1', value: '1' },
                ]}
              />
            </div>
            <div>
              <Button variant="outline">All</Button>
            </div>
          </SmallSelectionWrapper>
        </FilterFlex>
      </FiltersSection>
      {/* -------- Table -------- */}
      <TableSection>
        <Table>
          <thead>
            <Tr>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Category</Th>
              <Th>Type</Th>
              <Th>Amount</Th>
            </Tr>
          </thead>
          {trx.map(t => {
            return (
              <>
                <tbody>
                  <Tr>
                    <Td>{t.metadata?.bookingDate}</Td>
                    <Td>{truncateText(t?.details, 10)}</Td>
                    <Td>{t?.category}</Td>
                    <Td>{t.amount.startsWith('-') ? 'Expense' : 'Income'}</Td>
                    <Td>{t.amount}</Td>
                  </Tr>
                </tbody>
              </>
            );
          })}
        </Table>
      </TableSection>
      {/* -------- Pagination -------- */}
      <FooterSection>
        <p>Showing {currentPage} to {limit} of {totalPages} results</p>
        <span>
          <Button variant='outline' onClick={handlePreviousPage}>Previous</Button>{' '}
          <Button variant='outline' onClick={handleNextPage}>Next</Button>
        </span>
      </FooterSection>
    </Layout>
  );
};

export default Transactions;
