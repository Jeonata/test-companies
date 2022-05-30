import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';

interface CompaniesState {
  id: number;
  name: string;
  vatin: string;
}

interface PhonesState {
  id: string;
  type: string;
  company_id: number;
}

interface RequestContextData {
  companies: CompaniesState[];
  phones: PhonesState[];
  requestCompanies(): Promise<void>;
  requestPhones(): Promise<void>;
  clean(): void;
}

const RequestContext = createContext<RequestContextData>(
  {} as RequestContextData,
);

const RequestProvider: React.FC = ({ children }) => {
  const [dataCompanies, setDataCompanies] = useState<CompaniesState[]>(() => {
    const companies = localStorage.getItem('@GenericProject:companies');

    if (companies) {
      return [JSON.parse(companies)];
    }

    return [] as CompaniesState[];
  });

  const [dataPhones, setDataPhones] = useState<PhonesState[]>(() => {
    const phones = localStorage.getItem('@GenericProject:phones');

    if (phones) {
      return [JSON.parse(phones)];
    }

    return [] as PhonesState[];
  });

  const requestCompanies = useCallback(async () => {
    const response = await api.get('companies');

    const companies = response.data;

    localStorage.setItem('@CompaniesList:companies', companies);

    setDataCompanies([...companies]);
  }, []);

  const requestPhones = useCallback(async () => {
    const response = await api.get('phone_numbers');

    const phones = response.data;

    localStorage.setItem('@CompaniesList:phones', phones);

    setDataPhones([...phones]);
  }, []);

  const clean = useCallback(() => {
    localStorage.removeItem('@CompaniesList:companies');
    localStorage.removeItem('@CompaniesList:phone');

    setDataCompanies([]);
    setDataPhones([]);
  }, []);

  return (
    <RequestContext.Provider
      value={{
        companies: dataCompanies,
        phones: dataPhones,
        requestCompanies,
        requestPhones,
        clean,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

function useRequest(): RequestContextData {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error('useRequest must be used within an RequestProvider');
  }

  return context;
}

export { RequestProvider, useRequest };
