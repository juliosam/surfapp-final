import '../../sass/components/_vehiculo-card.scss';
import Image from 'next/image';
import Link from 'next/link';

export interface Vehiculo {
    id: number;
    documentId: string;
    Marca: string;
    Modelo: string;
    Version: string | null;
    Year: number;
    Ciudad: string;
    Precio: string;
    Recorrido: string;
    Descripcion: Array<{
        type: string;
        children: Array<{
            type: string;
            text: string;
        }>;
    }>;
    Clima: string;
    Traccion: string;
    Transmision: string;
    Direccion: string;
    Subtipo: string;
    Color: string;
    Tapizado: string;
    Combustible: string;
    Estado: string;
    Fotos: Array<{
        id: number;
        name: string;
        alternativeText: string | null;
        formats: {
            thumbnail: {
                url: string;
                width: number;
                height: number;
            };
            small: {
                url: string;
                width: number;
                height: number;
            };
            medium: {
                url: string;
                width: number;
                height: number;
            };
            large: {
                url: string;
                width: number;
                height: number;
            };
        };
        url: string;
    }>;
}

export default function VehiculoCard({ vehiculo }: { vehiculo: Vehiculo }) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
    
    return (
      <Link href={`/vehiculos/${vehiculo.documentId}`}>
      <div className="car-card">
          {vehiculo.Fotos && vehiculo.Fotos.length > 0 && (
              <Image 
                  src={`${baseUrl}${vehiculo.Fotos[0].formats.thumbnail.url}`}
                  alt={vehiculo.Fotos[0].alternativeText || `${vehiculo.Marca} ${vehiculo.Modelo}`}
                  width={260}
                  height={150}
                  className="object-cover mt-2 rounded"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiSk5QYWFZXl9lZ3xKc2RkYWf/2wBDAR"
              />
          )}
          <h6 className="text-xl font-bold">{vehiculo.Marca} {vehiculo.Modelo}</h6>
          <div className="mt-2">
              <p className="font-semibold">Precio: ${new Intl.NumberFormat('es-MX').format(Number(vehiculo.Precio))}</p>
              <p>Año: {vehiculo.Year}</p>
              <p>Kilometraje: {new Intl.NumberFormat('es-MX').format(Number(vehiculo.Recorrido))} km</p>
              <p>Ubicación: {vehiculo.Ciudad}, {vehiculo.Estado}</p>
          </div>
      </div>
      </Link>
    );
}