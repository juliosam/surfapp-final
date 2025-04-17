import qs from 'qs';
import VehiculoCard, { Vehiculo } from './VehiculoCard';

// This enables caching by default
async function getVehiculos() {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
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

    try {
        const res = await fetch(`${baseUrl}/api/vehiculos?${query}`, {
            next: { revalidate: 60 }, // Revalidate every minute
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch vehiculos');
        }

        const data = await res.json();
        return data.data as Vehiculo[];
    } catch (error) {
        console.error('Error fetching vehiculos:', error);
        throw new Error('Failed to load vehiculos');
    }
}

export default async function Vehiculos() {
    const vehiculos = await getVehiculos();

    return (
        <div className="container mx-auto px-4">
            {/* <h2 className="text-3xl font-bold my-6">Vehiculos</h2> */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {vehiculos.map((vehiculo) => 
                    vehiculo ? (
                        <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} />
                    ) : null
                )}
            </div>
        </div>
    );
}

// Add error boundary
export function generateMetadata() {
    return {
        title: 'Vehículos disponibles',
        description: 'Explora nuestra selección de vehículos disponibles',
    };
}