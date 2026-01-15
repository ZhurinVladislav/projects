import { TCompanyCategoryServices } from '@/types';

interface IProps {
  serviceCategories: TCompanyCategoryServices[];
}

const CompanyServices: React.FC<IProps> = props => {
  const { serviceCategories } = props;

  if (!serviceCategories) {
    return <></>;
  }

  return (
    <section data-testid="company-services" className="section">
      <div className="container">
        <h2 className="title-2 mx-auto text-center">Услуги</h2>
        {Array.isArray(serviceCategories) && serviceCategories.length > 0 && (
          <ul className="flex flex-col gap-16">
            {serviceCategories.map(serviceCategory => (
              <li className="flex flex-col gap-8" key={serviceCategory.id}>
                <div className="flex min-h-16 w-full max-w-108 items-center justify-center rounded-(--border-radius) border border-(--link-second-color) p-1.5 text-xl text-(--link-second-color)">
                  <p>{serviceCategory.title}</p>
                </div>
                {Array.isArray(serviceCategory.services) && serviceCategory.services.length > 0 && (
                  <ul className="flex flex-wrap gap-x-8 gap-y-6 rounded-(--border-radius) bg-(--gray-color) p-8 max-md:gap-5">
                    {serviceCategory.services.map(service => (
                      <li className="flex min-h-15 items-center justify-center rounded-(--border-radius) bg-white p-4 text-base font-normal" key={service.id}>
                        {service.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default CompanyServices;
