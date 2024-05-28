// AllContactsCtable.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CTable, CButton, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell , CListGroupItem} from '@coreui/react';
import * as XLSX from 'xlsx';

const AllContactsCtable = ({ entrepreneurs }) => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedEntrepreneurs, setSelectedEntrepreneurs] = useState([]);

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectedAll(isChecked);
    if (isChecked) {
      setSelectedEntrepreneurs(entrepreneurs.map(e => e._id));
    } else {
      setSelectedEntrepreneurs([]);
    }
  };

  const handleSelect = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedEntrepreneurs([...selectedEntrepreneurs, id]);
    } else {
      setSelectedEntrepreneurs(selectedEntrepreneurs.filter(e => e !== id));
      setSelectedAll(false);
    }
  };

  const exportToExcel = () => {
    const data = entrepreneurs.map(entrepreneur => ({
      Nom: entrepreneur.nom,
      Prenom: entrepreneur.prenom,
      'Startup Name': entrepreneur.startupName,
      'Activites Sector': entrepreneur.secteurActivites,
      Email: entrepreneur.email,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entrepreneurs");
    XLSX.writeFile(workbook, "entrepreneurs.xlsx");
  };

  return (
    <>
      <CButton color="success" onClick={exportToExcel} className="mb-3">Export to Excel</CButton>
      <CTable responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>
              <input type="checkbox" checked={selectedAll} onChange={handleSelectAll} />
            </CTableHeaderCell>
            <CTableHeaderCell>Entrepreneur Name</CTableHeaderCell>
            <CTableHeaderCell>Startup Name</CTableHeaderCell>
            <CTableHeaderCell>Activities Sector</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell></CTableHeaderCell> {/* See More button */}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {entrepreneurs.map((entrepreneur) => (
            <CTableRow key={entrepreneur._id}>
              <CTableDataCell>
                <input
                  type="checkbox"
                  checked={selectedEntrepreneurs.includes(entrepreneur._id)}
                  onChange={(e) => handleSelect(e, entrepreneur._id)}
                />
              </CTableDataCell>
              <CTableDataCell>{entrepreneur.nom} {entrepreneur.prenom}</CTableDataCell>
              <CTableDataCell>{entrepreneur.startupName}</CTableDataCell>
              <CTableDataCell>{entrepreneur.secteurActivites}</CTableDataCell>
              <CTableDataCell>{entrepreneur.email}</CTableDataCell>
              <CTableDataCell>
              <CButton color="primary">
                <CListGroupItem as={Link} to={`/Dash/allContacts/entrepreneur/${entrepreneur._id}`}>
                  view
                </CListGroupItem>
              </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default AllContactsCtable;
