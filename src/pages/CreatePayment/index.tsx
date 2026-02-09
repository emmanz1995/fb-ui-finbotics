import { useState } from 'react';
import type { FC } from 'react';
import Layout from '../../components/template';
import styled from 'styled-components';
import { ThemeProps } from '../../styles/themes';
import Label from '../../components/atoms/label';
import Select from '../../components/atoms/select';
import Button from '../../components/atoms/button';
import Input from '../../components/atoms/input';

const CreatePayment: FC = () => {
  const [users, setUsers] = useState([]);
  return (
    <Layout>
      <Header>
        <h1>Make a Payment</h1>
      </Header>
      <MainSection>
        <RightSection>
          <h3>Transfer Details</h3>
          <Form>
            <InputSection>
              <Label name="account-from">From Account</Label>
              <select style={{ padding: '8px', width: '100%' }}>
                <option value="Account - def-456">Account - def-456</option>
              </select>
            </InputSection>
            <InputSection>
              <Label name="account-from">Quick Select Payee</Label>
            </InputSection>
            <InputSection>
              <Label name="account-from">Recipient Name</Label>
              <Input type="text" fullWidth />
            </InputSection>
            <ScanNumberInput>
              <InputSection>
                <Label name="account-from">Sort Code</Label>
                <Input type="text" fullWidth />
              </InputSection>
              <InputSection>
                <Label name="account-from">Account Number / IBAN</Label>
                <Input type="text" fullWidth />
              </InputSection>
            </ScanNumberInput>
            <InputSection>
              <Label name="account-from">Amount</Label>
              <Input type="number" fullWidth />
            </InputSection>
            <InputSection>
              <Label name="account-from">Reference</Label>
              <Input type="text" fullWidth />
            </InputSection>
            <Button variant="primary" fullWidth="full">
              Review Payment
            </Button>
          </Form>
        </RightSection>
        <LeftSection>
          <RecentTransferBox>
            <h3>Recent Transfers</h3>
          </RecentTransferBox>
        </LeftSection>
      </MainSection>
    </Layout>
  );
};

export default CreatePayment;

const ScanNumberInput = styled.div<ThemeProps>`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  padding: 1rem 0;
`;

const InputSection = styled.div`
  padding: 1rem 0;
`;

const Header = styled.header<ThemeProps>`
  padding: 10px 0;
`;
const MainSection = styled.section<ThemeProps>`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`;
const RightSection = styled.div<ThemeProps>`
  background-color: #fff;
  padding: 2rem;
  border-radius: 6px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;
const LeftSection = styled.div<ThemeProps>`
  background-color: #fff;
  padding: 2rem;
  height: 500px;
  border-radius: 6px;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;
const Form = styled.form`
  // div {
  //   padding: 1rem 0;
  // }
`;
const RecentTransferBox = styled.div<ThemeProps>``;
