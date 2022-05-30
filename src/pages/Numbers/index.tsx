import React, { Fragment, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Button from 'components/Button';
import { useRequest } from 'hooks/request';

import { Container, Content } from './styles';

export function Numbers() {
  const history = useHistory();

  const { numberId } = useParams<{ numberId: string }>();

  const { requestPhones, phones } = useRequest();

  useEffect(() => {
    const fetchData = async () => {
      await requestPhones();
    };

    fetchData();
  }, [requestPhones]);

  return (
    <Container>
      <Content>
        <h1>Details</h1>
        <div>
          <div>
            {phones
              .filter(phone => phone.id === numberId)
              .map(phone => {
                return (
                  <Fragment key={phone.id}>
                    <p>{phone.id}</p>
                    <p>{phone.type}</p>
                  </Fragment>
                );
              })}
          </div>
        </div>

        <Button type="button" onClick={() => history.goBack()}>
          Go Back
        </Button>
      </Content>
    </Container>
  );
}
