// utils/caseConverter.ts
/**
 * Преобразует ключи объекта из camelCase в snake_case
 */
export const camelToSnake = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => camelToSnake(item));
  }
  if (typeof obj === 'object' && !(obj instanceof File)) {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      acc[snakeKey] = camelToSnake(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};
