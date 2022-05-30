import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import Button from 'components/Button';
import { useRequest } from 'hooks/request';

import { Container, Content } from './styles';

export function Companies() {
  const history = useHistory();

  const { companyId } = useParams<{ companyId: string }>();

  const { requestPhones, requestCompanies, companies, phones } = useRequest();

  useEffect(() => {
    const fetchData = async () => {
      await requestPhones();
    };

    fetchData();
  }, [requestPhones]);

  useEffect(() => {
    const fetchData = async () => {
      await requestCompanies();
    };

    fetchData();
  }, [requestCompanies]);

  return (
    <Container>
      <Content>
        <h1>
          {companies
            .filter(company => company.id === Number(companyId))
            .map(company => company.name)}
        </h1>
        <div>
          {phones.filter(phone => phone.company_id === Number(companyId))
            .length > 0 ? (
            <>
              <div>
                <span>Number</span>
                {phones
                  .filter(phone => phone.company_id === Number(companyId))
                  .map(phone => {
                    return (
                      <p key={phone.id}>
                        <Link to={`/number/${phone.id}`}>{phone.id}</Link>
                      </p>
                    );
                  })}
              </div>
              <div>
                <span>Type</span>
                {phones
                  .filter(phone => phone.company_id === Number(companyId))
                  .map(phone => {
                    return <p key={phone.id}>{phone.type}</p>;
                  })}
              </div>
            </>
          ) : (
            <div>
              <span>No Data</span>
            </div>
          )}
        </div>

        <Button type="button" onClick={() => history.goBack()}>
          Go Back
        </Button>
      </Content>
    </Container>
  );
}
