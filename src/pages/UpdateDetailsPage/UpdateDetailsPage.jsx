import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import SectionContent from '../../components/SectionContent/SectionContent';
import { useQuery } from '@tanstack/react-query';
import { fetchUpdateSection } from '../../queries/fetchAPI';

const UpdateDetailsPage = () => {
  const { id } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['updateDetails'],
    queryFn: () => fetchUpdateSection(id),
  });
  console.log(data);
  return (
    <main className='page'>
      <div className='titleButtonContainer'>
        <Title
          mainTitle='Mises à jour'
          shadowTitle='DEVBLOG'
        />
        <Link to='/updates'>
          <Button title='Voir toutes nos mises à jour' />
        </Link>
      </div>
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : isError ? (
        <p>Erreur : Impossible de récupérer les données: {error.message}</p>
      ) : (
        <SectionContent sectionData={data} />
      )}
    </main>
  );
};

export default UpdateDetailsPage;
