export const ProductsActionTypes = {
    LOAD_PRODUCTS_START: '[Products] LOAD_PRODUCTS_START',
    LOAD_PRODUCTS_SUCCESS: '[Products] LOAD_PRODUCTS_SUCCESS',
    LOAD_PRODUCTS_ERROR: '[Products] LOAD_PRODUCTS_ERROR',

    LOAD_PRODUCT_START: '[Products] LOAD_PRODUCT_START',
    LOAD_PRODUCT_SUCCESS: '[Products] LOAD_PRODUCT_SUCCESS',
    LOAD_PRODUCT_ERROR: '[Products] LOAD_PRODUCT_ERROR',

    REMOVE_PRODUCT: '[Products] REMOVE_PRODUCT',

    SET_PAGE: '[Pagination] SET_PAGE',
    SET_TOTAL_COUNT: '[Pagination] SET_TOTAL_COUNT'
} as const;