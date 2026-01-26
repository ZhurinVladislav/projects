const CompanyHeroSkeleton = () => {
  return (
    <ul data-testid="stats-list-skeleton" className="grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
      <li className="card h-43 animate-pulse items-center justify-center bg-gray-200 text-center max-md:h-31">
        <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </li>
      <li className="card h-43 animate-pulse items-center justify-center bg-gray-200 text-center max-md:h-31">
        <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </li>
      <li className="card h-43 animate-pulse items-center justify-center bg-gray-200 text-center max-md:h-31">
        <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </li>
      <li className="card h-43 animate-pulse items-center justify-center bg-gray-200 text-center max-md:h-31">
        <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </li>
    </ul>
  );
};

export default CompanyHeroSkeleton;
