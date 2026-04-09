type HeaderListProps = {
    title: string;
    description: string;
}
export default function HeaderList({ title, description }: HeaderListProps) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}