import { fetchGetCategoriesServices } from './categories-services';
import { fetchGetCategoryServices } from './categories-services/services';
import { fetchCompaniesByPage } from './companies/by-page';
import { fetchCompanyByPage } from './companies/show';
import { fetchGetPageByAlias } from './pages';
import { fetchGetPosts } from './posts';

const Api = {
  // pages
  fetchGetPageByAlias,
  // services
  // fetchGetCategories,
  fetchGetCategoriesServices,
  fetchGetCategoryServices,
  // companies
  fetchCompaniesByPage,
  fetchCompanyByPage,
  // posts
  fetchGetPosts,
};

export default Api;
