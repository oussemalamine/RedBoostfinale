import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance.js'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CFormLabel,
  CFormTextarea,
  CInputGroup

} from '@coreui/react';
import  "./contactStyle.css";
const CreateContact = () => {
  const [contactData, setContactData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    dateDeNaissance: '',
    region: '',
    gender: '',
    age: '',
    startupName: '',
    description: '',
    gouvernorat: '',
    secteurActivites: '',
    nombreCofondateurs: '',
    nombreCofondateursFemmes: '',
    creeeOuNon: '',
    formeJuridique: '',
    nombreEmploisCrees: '',
    coutProjet: '',
    nombreHeuresFormationCollective: '',
    nombreHeuresFormationIndividuelle: '',
    objectifsFinancement: '',
    etatAvancementProjets: '',
    autreFinancement: '',
    organismeFinancement: '',
    financementDecaisse: '',
    dateDecaissement: '',
    montantFinancementAccorde: '',
    blacklisted: false,

  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axiosInstance.post('/createntrepreneurs', contactData);
      alert('Contact created successfully');
      // Reset form
      setContactData({
        nom: '',
        prenom: '',
        adresse: '',
        email: '',
        dateDeNaissance: '',
        region: '',
        gender: '',
        age: '',
        startupName: '',
        description: '',
        gouvernorat: '',
        secteurActivites: '',
        nombreCofondateurs: '',
        nombreCofondateursFemmes: '',
        creeeOuNon: '',
        formeJuridique: '',
        nombreEmploisCrees: '',
        coutProjet: '',
        nombreHeuresFormationCollective: '',
        nombreHeuresFormationIndividuelle: '',
        objectifsFinancement: '',
        etatAvancementProjets: '',
        autreFinancement: '',
        organismeFinancement: '',
        financementDecaisse: '',
        dateDecaissement: '',
        montantFinancementAccorde: '',
        blacklisted: false,
        entrepreneurImage: '',
        startupLogo: ''
      });
    } catch (error) {
      console.error(error);
      alert('Failed to create contact');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };



  return (
    <CContainer className="my-4">
      <CCard>
        <CCardHeader className="bg-dark text-light">Create New Contact</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>

            <div className='contactSection'>
              <CFormLabel className='sectionTitle' >Information sur l'entrepreneurs</CFormLabel>

              <CFormInput
                type="text"
                name="nom"
                value={contactData.nom}
                onChange={handleInputChange}
                placeholder="Nom"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="prenom"
                value={contactData.prenom}
                onChange={handleInputChange}
                placeholder="Prénom"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="adresse"
                value={contactData.adresse}
                onChange={handleInputChange}
                placeholder="Adresse"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="email"
                value={contactData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="dateDeNaissance"
                value={contactData.dateDeNaissance}
                onChange={handleInputChange}
                placeholder="Date de Naissance"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="region"
                value={contactData.region}
                onChange={handleInputChange}
                placeholder="Region"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormSelect
                name="gender"
                value={contactData.gender}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              >
                <option value="">Select Gender</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
              </CFormSelect>

              <CFormInput
                type="number"
                name="age"
                value={contactData.age}
                onChange={handleInputChange}
                placeholder="Age"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
            </div>

            <div className='contactSection'>
              <CFormLabel className='sectionTitle'>Information sur le projet</CFormLabel>

              <CFormInput
                type="text"
                name="startupName"
                value={contactData.startupName}
                onChange={handleInputChange}
                placeholder="Startup Name"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormTextarea
                type="text"
                name="description"
                value={contactData.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />

              <CFormInput
                type="text"
                name="gouvernorat"
                value={contactData.gouvernorat}
                onChange={handleInputChange}
                placeholder="Gouvernorat"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />

              <CFormInput
                type="text"
                name="secteurActivites"
                value={contactData.secteurActivites}
                onChange={handleInputChange}
                placeholder="Secteur d'activites"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="nombreCofondateurs"
                value={contactData.nombreCofondateurs}
                onChange={handleInputChange}
                placeholder="Nombre Cofondateurs"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="nombreCofondateursFemmes"
                value={contactData.nombreCofondateursFemmes}
                onChange={handleInputChange}
                placeholder="Nombre Cofondateurs Femmes"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormSelect
                name="creeeOuNon"
                value={contactData.creeeOuNon}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              >
                <option value="">Creé Ou Non</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </CFormSelect>

              <CFormSelect
                name="formeJuridique"
                value={contactData.formeJuridique}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              >
                <option value="">Forme Juridique</option>
                <option value="SARL">Société à Responsabilité Limitée SARL</option>
                <option value="SA">Société Anonyme SA</option>
                <option value="EI">Entreprise Individuelle</option>
                <option value="SNC">Société en Nom Collectif SNC</option>
                <option value="SCS">Société en Commandite Simple SCS</option>
                <option value="SEP">Société en Participation</option>
              </CFormSelect>
              <CFormInput
                type="number"
                name="nombreEmploisCrees"
                value={contactData.nombreEmploisCrees}
                onChange={handleInputChange}
                placeholder="Nombre Emplois Crees"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="number"
                name="coutProjet"
                value={contactData.coutProjet}
                onChange={handleInputChange}
                placeholder="Coût du Projet"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
            </div>

            <div className='contactSection'>

              <div>
              <CFormLabel className='sectionTitle'>Activités avec Redstart Tunisie</CFormLabel>
              <CFormInput
                type="number"
                name="nombreHeuresFormationCollective"
                value={contactData.nombreHeuresFormationCollective}
                onChange={handleInputChange}
                placeholder="Nombre Heures Formation Collective"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              </div>

              <CFormInput
                type="number"
                name="nombreHeuresFormationIndividuelle"
                value={contactData.nombreHeuresFormationIndividuelle}
                onChange={handleInputChange}
                placeholder="Nombre Heures Formation Individuelle"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormTextarea
                type="text"
                name="objectifsFinancement"
                value={contactData.objectifsFinancement}
                onChange={handleInputChange}
                placeholder="Objectifs Financement"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="etatAvancementProjets"
                value={contactData.etatAvancementProjets}
                onChange={handleInputChange}
                placeholder="Etat Avancement Projets"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="autreFinancement"
                value={contactData.autreFinancement}
                onChange={handleInputChange}
                placeholder="Autre Financement"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="organismeFinancement"
                value={contactData.organismeFinancement}
                onChange={handleInputChange}
                placeholder="Besoin Financement"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="financementDecaisse"
                value={contactData.financementDecaisse}
                onChange={handleInputChange}
                placeholder="Financement Decaisse"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="date"
                name="dateDecaissement"
                value={contactData.dateDecaissement}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormInput
                type="text"
                name="montantFinancementAccorde"
                value={contactData.montantFinancementAccorde}
                onChange={handleInputChange}
                placeholder="Montant Financement Accorde"
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              />
              <CFormSelect
                name="blacklisted"
                value={contactData.blacklisted}
                onChange={handleInputChange}
                required
                style={{ marginBottom: '10px' }} // Add margin bottom
              >
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </CFormSelect>
            </div>

            <CButton type="submit" color="primary" className="mt-3">
              Create Contact
            </CButton>

          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default CreateContact;
