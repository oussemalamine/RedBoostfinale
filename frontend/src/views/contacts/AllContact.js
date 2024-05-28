import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntrepreneurs } from '../../app/features/entrepreneursData/entrepreneursSlice'; // adjust the path

import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';
import AllContactsCtable from '../../components/contacts/AllContactsCtable';
import AdvancedFilter from './AdvancedFilter';

const AllContacts = () => {
  const dispatch = useDispatch(); // Use useDispatch hook
  const [filters, setFilters] = useState({}); // State to store filters

  useEffect(() => {
    dispatch(loadEntrepreneurs());
  }, [dispatch]);

  const entrepreneurs = useSelector((state) => state.entrepreneurs.entrepreneurs);

  // Function to handle filter updates
  const handleFilterUpdate = (newFilters) => {
    setFilters(newFilters);
  };

  // Function to filter entrepreneurs based on filters
  const getFilteredEntrepreneurs = () => {
    return entrepreneurs.filter((entrepreneur) => {
      const age = entrepreneur.age;
      return (
        (!filters.sector || entrepreneur.secteurActivites === filters.sector) &&
        (!filters.gender || entrepreneur.gender === filters.gender) &&
        (!filters.region || entrepreneur.region === filters.region) &&
        (!filters.ageMin || age >= parseInt(filters.ageMin)) &&
        (!filters.ageMax || age <= parseInt(filters.ageMax)) &&
        (!filters.gouvernorat || entrepreneur.gouvernorat === filters.gouvernorat) &&
        (!filters.nom || entrepreneur.nom.toLowerCase().includes(filters.nom.toLowerCase())) &&
        (!filters.prenom || entrepreneur.prenom.toLowerCase().includes(filters.prenom.toLowerCase()))
        // Add more filter conditions as needed
      );
    });
  };

  const filteredEntrepreneurs = getFilteredEntrepreneurs();

  return (
    <CContainer className="my-4">
      <AdvancedFilter entrepreneurs={entrepreneurs} onFilterUpdate={handleFilterUpdate} />
      <CCard className='mt-4'>
        <CCardHeader className="bg-dark text-light">All Contacts</CCardHeader>
        <CCardBody>
          {entrepreneurs.length === 0 ? (
            <div>Loading entrepreneurs...</div>
          ) : (
            <AllContactsCtable entrepreneurs={filteredEntrepreneurs} />
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default AllContacts;
