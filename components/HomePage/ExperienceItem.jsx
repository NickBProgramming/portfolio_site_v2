
export default function ExperienceItem({ title, company, date, description }) {
    return (
        <div className="flex flex-col">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-lg font-light text-primary">{company}</p>
            <p className="text-lg font-light">{date}</p>
            <p className="text-lg font-light">{description}</p>
        </div>
    );
}