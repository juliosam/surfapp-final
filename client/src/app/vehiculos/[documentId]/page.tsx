import qs from 'qs';
import Link from 'next/link';
import { Vehiculo } from '../VehiculoCard';
import '../../../sass/components/_vehiculo.scss';

// Define props type for clarity
interface VehiculoPageProps {
  params: { documentId: string };
}

// SEO metadata
export async function generateMetadata({ params }: VehiculoPageProps) {
  const baseUrl = 'http://localhost:1337';
  const { documentId } = await params;

  const res = await fetch(`${baseUrl}/api/vehiculos/${documentId}`, {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
  });
  const data: { data: Vehiculo | null } = await res.json();
  const vehiculo = data.data;

  if (!vehiculo) {
    return {
      title: 'Vehículo no encontrado',
      description: 'No se encontró el vehículo solicitado.',
    };
  }

  return {
    title: `${vehiculo.Marca} ${vehiculo.Modelo} - Detalles`,
    description: `Detalles del ${vehiculo.Marca} ${vehiculo.Modelo}, año ${vehiculo.Year}`,
  };
}

export default async function VehiculoPage({ params }: VehiculoPageProps) {
  const baseUrl = 'http://localhost:1337';
  const { documentId } = await params;
  const query = qs.stringify(
      {
          populate: {
              Fotos: {
                  populate: "*",
              },
          },
      },
      {
          encodeValuesOnly: true,
      }
  );

  const res = await fetch(`${baseUrl}/api/vehiculos/${documentId}?${query}`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
  });
  const data: { data: Vehiculo | null } = await res.json();
  const vehiculo = data.data;

  // console.log(vehiculo);

  if (!vehiculo) {
    return (
      <div>
        <p>Vehículo no encontrado</p>
        <Link href="/">Volver a la lista</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>
        {vehiculo.Marca} {vehiculo.Modelo} {vehiculo.Version || ''}
      </h1>

      {/* Gallery */}
      <div className="top-data">
        <p>
            <strong>Año:</strong> {vehiculo.Year}
        </p>
        <p>
            <strong>Precio:</strong> ${vehiculo.Precio}
        </p>
        <p>
            <strong>Ciudad:</strong> {vehiculo.Ciudad}
        </p>
        <p>
            <strong>Recorrido:</strong> {vehiculo.Recorrido} km
        </p>
      </div>
      {vehiculo.Fotos && vehiculo.Fotos.length > 0 ? (
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            {vehiculo.Fotos.map((foto) => (
              <div key={foto.id} style={{ position: 'relative' }}>
                <img
                  src={`${baseUrl}${foto.formats.medium.url}`}
                  alt={foto.alternativeText || `${vehiculo.Marca} ${vehiculo.Modelo}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No hay fotos disponibles</p>
      )}

      {/* Vehicle Details */}
      <div className="bottom-data">
        <p>
            <strong>Clima:</strong> {vehiculo.Clima}
        </p>
        <p>
            <strong>Tracción:</strong> {vehiculo.Traccion}
        </p>
        <p>
            <strong>Transmisión:</strong> {vehiculo.Transmision}
        </p>
        <p>
            <strong>Dirección:</strong> {vehiculo.Direccion}
        </p>
        <p>
            <strong>Subtipo:</strong> {vehiculo.Subtipo}
        </p>
        <p>
            <strong>Color:</strong> {vehiculo.Color}
        </p>
        <p>
            <strong>Tapizado:</strong> {vehiculo.Tapizado}
        </p>
        <p>
            <strong>Combustible:</strong> {vehiculo.Combustible}
        </p>
        <p>
            <strong>Estado:</strong> {vehiculo.Estado}
        </p>
      </div>
      <div>
        <strong>Descripción:</strong>
        {vehiculo.Descripcion.map((block, index) => (
          <p key={index}>
            {block.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px', fontSize: '2rem', fontWeight: '700', color: '#777' }}>
        <Link href="/">Volver a la lista</Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const baseUrl = 'http://localhost:1337';
  const res = await fetch(`${baseUrl}/api/vehiculos`, {
    headers: { 'Content-Type': 'application/json' },
  });
  const data: { data: Vehiculo[] } = await res.json();
  const vehiculos = data.data || [];

  return vehiculos.map((vehiculo) => ({
    documentId: vehiculo.documentId,
  }));
}

export const revalidate = 60; // ISR: Revalidate every 60 seconds // ISR: Revalidate every 60 seconds