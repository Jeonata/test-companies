import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useRequest } from 'hooks/request';

import { Container, Content } from './styles';

export function Dashboard() {
  const { requestCompanies, companies } = useRequest();

  useEffect(() => {
    const fetchData = async () => {
      await requestCompanies();
    };

    fetchData();
  }, [requestCompanies]);

  return (
    <Container>
      <Content>
        <h1>Companies</h1>
        <div>
          <div>
            <span>Company Name</span>
            {companies.map(company => {
              return (
                <p key={company.id}>
                  <Link to={`/company/${company.id}`}>{company.name}</Link>
                </p>
              );
            })}
          </div>
          <div>
            <span>Vatin</span>
            {companies.map(company => {
              return <p key={company.vatin}>{company.vatin}</p>;
            })}
          </div>
        </div>
      </Content>
    </Container>
  );
}
