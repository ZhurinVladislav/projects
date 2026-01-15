import { fetchGetCategoriesServices } from './categories-services';
import { fetchGetCategoryServices } from './categories-services/services';
import { fetchCompaniesByPage } from './companies/by-page';
import { fetchCompanyByPage } from './companies/show';
import { fetchGetPageByAlias } from './pages';
import { fetchGetPosts } from './posts';
import { fetchGetServices } from './services';
import { fetchGetStatistics } from './statistics';
import { fetchStoreVisit } from './visits';

const Api = {
  // pages
  fetchGetPageByAlias,
  // services
  fetchGetServices,
  // fetchGetCategories,
  fetchGetCategoriesServices,
  fetchGetCategoryServices,
  // companies
  fetchCompaniesByPage,
  fetchCompanyByPage,
  // posts
  fetchGetPosts,
  // statistics
  fetchGetStatistics,
  // visits
  fetchStoreVisit,
};

export default Api;
