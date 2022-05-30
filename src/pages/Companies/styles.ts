import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  > h1 {
    margin-bottom: 20px;
  }

  > div {
    display: flex;
    flex-direction: row;
    gap: 12px;

    > div > span {
      font-weight: 500;
    }
  }

  > p > a {
    color: #1d8bf0;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
  }
`;
