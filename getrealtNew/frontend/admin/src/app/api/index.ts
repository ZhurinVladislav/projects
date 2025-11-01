import { fetchLogout } from './auth/logout';
import { fetchProfileUser } from './auth/profile';
import { fetchUpdateUser } from './auth/update';
import { FetchCategoriesServicesList } from './categories-services';
import { FetchDeleteCategoryServices } from './categories-services/delete';
import { fetchShowCategoryServices } from './categories-services/show';
import { FetchStoreCategoryServices } from './categories-services/store';
import { fetchUpdateCategoryService } from './categories-services/update';
import { fetchCompanies } from './companies';
import { fetchDeleteCompany } from './companies/delete';
import { fetchShowCompany } from './companies/show';
import { fetchStoreCompany } from './companies/store';
import { fetchUpdateCompany } from './companies/update';
import { fetchGetPages } from './pages';
import { fetchPostPage } from './pages-create';
import { fetchDeletePage } from './pages-delete';
import { fetchGetPagesSimple } from './pages-simple';
import { fetchShowPage } from './pages/show/fetchShowPage';
import { fetchUpdatePage } from './pages/update';
import { fetchServices } from './services';
import { fetchDeleteService } from './services/delete';
import { fetchShowService } from './services/show';
import { fetchStoreService } from './services/store';
import { fetchUpdateService } from './services/update';

const Api = {
  // user
  fetchLogout,
  fetchProfileUser,
  fetchUpdateUser,
  // pages
  fetchGetPages,
  fetchShowPage,
  fetchGetPagesSimple,
  fetchPostPage,
  fetchUpdatePage,
  fetchDeletePage,
  // categories
  FetchCategoriesServicesList,
  fetchShowCategoryServices,
  FetchStoreCategoryServices,
  fetchUpdateCategoryService,
  FetchDeleteCategoryServices,
  // services
  fetchServices,
  fetchShowService,
  fetchStoreService,
  fetchUpdateService,
  fetchDeleteService,
  // companies
  fetchCompanies,
  fetchShowCompany,
  fetchStoreCompany,
  fetchUpdateCompany,
  fetchDeleteCompany,
};

export default Api;
