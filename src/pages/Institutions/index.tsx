import { useState, useEffect, useCallback } from 'react';
import type { FC, MouseEvent } from 'react';
import { InstitutionGrid } from './styles';
import Layout from '../../components/template';
import {
  ContentContainer,
  Title,
  Subtitle,
  HeaderContent,
} from '../../styles/common';
import { InstitutionCard } from '../../components/molecules/card';
// import { fetchInstitutions } from '../../connector/institutions';
import { fetchInstitutions } from '../../connector/institutions'
// import Pagination from '../../components/molecules/pagination';
// import { map } from 'lodash';
// import Button from '../../components/atoms/button';

interface InstitutionProps {
  _id: string;
  name: string;
  bic: string;
  transaction_total_days: string;
  countries: string[];
  logo: string;
  max_access_valid_for_days: string;
}
// const options = [6, 9, 12];

const Institutions: FC = () => {
  const [institutions, setInstitutions] = useState<InstitutionProps[]>([]);
  const [institutionId, setInstitutionId] = useState('');
  // this is to capture index for current institutions card
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [message, setMessage] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // const [limit, setLimit] = useState(9);
  // const [totalPages, setTotalPages] = useState(0);
  // const [offSet, setOffset] = useState(0);

  const getInstitutions = useCallback(async () => {
    // const res = await fetchInstitutions({ currentPage, limit });
    setInstitutions(fetchInstitutions);
    // setCurrentPage(res.pagination.pages);
    // setTotalPages(res.pagination.totalPages);
  }, [
    // currentPage, limit
  ]);

  useEffect(() => {
    getInstitutions();
  }, [getInstitutions]);

  const grabInstitutionId = (
    bankId: string,
    cardIndex: number,
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    setInstitutionId(bankId);
    const institutionName = institutions.find(
      institution => institution._id === bankId
    )?.name;
    setMessage(`You have selected the ${institutionName} institution.`);
    setCurrentIndex(cardIndex);
  };

  const handleConnectToInstitution = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${import.meta.env.VITE_API_URL_ACCOUNTS}/api/v1/access/connect-bank`;

    const input = document.createElement('input');
    input.value = institutionId;
    input.type = 'hidden';
    input.name = 'institutionId';

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  };

  // const handleChangePage = (
  //   evt: MouseEvent<HTMLButtonElement>,
  //   pageNumber: number
  // ) => {
  //   evt.preventDefault();
  //   setCurrentPage(pageNumber);
  // };

  // const handleSwitchLimit = (newLimit: number) => {
  //   setLimit(newLimit);
  //   console.log(newLimit);
  //   setCurrentPage(1);
  // };

  return (
    <Layout>
      <ContentContainer>
        <HeaderContent>
          <Title>Connect Your Bank</Title>
          <Subtitle>
            Select your bank to securely connect your accounts. We use
            bank-level security to keep your information safe.
          </Subtitle>
          {message && <p>{message}</p>}
        </HeaderContent>
        {/*<div>
          {map(options, (option: number, i: number) => {
            return (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwitchLimit(option)}
                key={i}
              >
                {option}
              </Button>
            );
          })}
        </div>*/}
        <InstitutionGrid>
          {institutions?.map((institution: InstitutionProps, index: number) => (
            <InstitutionCard
              key={institution._id}
              institution={institution}
              grabInstitutionId={grabInstitutionId}
              handleConnectToInstitution={handleConnectToInstitution}
              institutionId={institutionId}
              cardIndex={index}
              currentIndex={currentIndex}
            />
          ))}
        </InstitutionGrid>
        {/* <select onClick={() => handleSwitchLimit(limit)}>
          {options.map((option: number, i: number) => (
            <div key={i}>
              <option value={option}>{option}</option>
              <option value={option}>{option}</option>
              <option value={option}>{option}</option>
              <option value={option}>{option}</option>
            </div>
          ))}
        </select> */}
        {/* <Pagination
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        /> */}
      </ContentContainer>
    </Layout>
  );
};

export default Institutions;
